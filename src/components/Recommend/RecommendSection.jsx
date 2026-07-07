import { RecommendSpots } from "../../data/RecommendSpots"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import { useNavigate } from "react-router-dom";

import styles from "./RecommendSection.module.css";

import "swiper/css"
import "swiper/css/navigation"


export const RecommendSection = () => {
  const navigate = useNavigate();


  return (
    <div className={styles.recommendContainer}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".recommend-next",
          prevEl: ".recommend-prev",
        }}
        spaceBetween={16}
        slidesPerView={2.2}
        breakpoints={{
          0: { slidesPerView: 1.2},
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 2.2 },
        }}
      >
      {RecommendSpots.map(spot => {
        return (
          <SwiperSlide 
            key={spot.name}
            onClick={() => navigate(`/detail/${spot.name}`)}>
            <div className={styles.recommendCard}>
              <img
                src={spot.image}
                alt={spot.name}
                className={styles.recommendImg}
              />
              <h2 className={styles.recommendCardTitle}>{spot.name}</h2>
              <p className={styles.recommendCardPref}>{spot.prefecture}</p>
              <p className={styles.recommendCardDesc}>{spot.description}</p>
            </div>
          </SwiperSlide>
        )
      })}
      </Swiper>

      <button className={`${styles.recommendArrow} recommend-prev`}>
        <IoChevronBack />
      </button>
      <button className={`${styles.recommendArrow} recommend-next`}>
        <IoChevronForward />
      </button>
     </div>
  )
}