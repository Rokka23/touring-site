import { useState, useEffect } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import { Header } from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { IoTrashOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import styles from "./Favorites.module.css";


export const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
      const loadPlan = () => {
        const saved = localStorage.getItem('Favorites');
        if (saved) {
          setFavorites(JSON.parse(saved));
        }
      };
    
      loadPlan(); // 初回読み込み
    
      window.addEventListener('favoritesUpdated', loadPlan);
      return () => window.removeEventListener('favoritesUpdated', loadPlan);
    }, []);

    const onDelete = (name) => {
      setFavorites(prev => {
        const updated = prev.filter(s => s.name !== name);
        localStorage.setItem('Favorites', JSON.stringify(updated));
        return updated;
      });
    }


  return (
    <>
      <Header />
      <main>
        <div className={styles.favTitleBox}>
          <div className={styles.titleIcon}>
            <FaRegHeart />
          </div>
          <h1 className={styles.favTitle}>お気に入り</h1>
        </div>
        <div className={styles.favInner}>
          <button className="back-btn" onClick={() => navigate('/')}>← ホーム画面に戻る</button>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".fav-next",
                prevEl: ".fav-prev",
              }}
              spaceBetween={16}
              slidesPerView={4}
              breakpoints={{
                0: { slidesPerView: 0},
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {favorites.map(fav => {
                return (
                  <SwiperSlide
                    key={fav.name}
                  >
                    <div className={styles.favCard}>
                      {fav.image ? (
                        <img
                          src={fav.image}
                          alt={fav.name}
                          className={styles.favImg}
                        />
                      ) : (
                        <div className={`${styles.favImg} ${styles.favImgPlaceholder}`}>
                          <span>画像なし</span>
                        </div>
                      )}
                      <div className={styles.favCardInfoArea}>
                        <h2 className={styles.favCardTitle}>{fav.name}</h2>
                        <p className={styles.favCardPref}>{fav.prefecture}</p>
                        <p className={styles.favCardDesc}>{fav.description}</p>
                      </div>
                      <div className={styles.favCardBtn}>
                        <button
                          className={styles.detailBtn}
                          onClick={() => navigate(`/detail/${fav.name}`)}
                        >
                          詳細を開く
                        </button>
                        <button
                          className={styles.deleteFavBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(fav.name);
                          }}
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>    

          <button className={`${styles.favArrow} ${styles.favPrev} fav-prev`}>
            <IoChevronBack />
          </button>
          <button className={`${styles.favArrow} ${styles.favNext} fav-next`}>
            <IoChevronForward />
          </button>
        </div>
      </main>
    </>

  )
}