import { Header } from "../../components/Header/Header"
import { Spots } from "../..//data/spots";
import { BottomTab } from "../../components/BottomTab/BottomTab";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./DetailPage.module.css";

export const DetailPage = () => {

  const navigate = useNavigate();
  const { name } = useParams();

  const spot = Spots.find(spot => spot.name == name)


  return (
    <>
      <Header />

      <main>
        <div className={styles.mainInner}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>← ホーム画面に戻る</button>
          <div className={styles.detailContent}>
          <img
            src={spot.image}
            alt={spot.name}
            className={styles.spotImg}
          />
            <div className={styles.detailDescription}>
              <span className={styles.titleTab}>スポット</span>
              <h2 className={styles.spotName}>{name}</h2>
              <h3 className={styles.spotTab}>概要</h3>
              <p className={styles.spotText}>{spot.description}</p>
              <h3 className={styles.spotTab}>住所</h3>
              <p className={styles.spotText}>{spot.address}</p>
              <div className={styles.mapBtnArea}>
                <button 
                  className={styles.mapBtn}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name)}`,
                      "_blank"
                    )
                  }
                >
                  Googleマップで開く
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomTab />
    </>
  )
}
