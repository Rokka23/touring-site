import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./MapArea.module.css";

export const MapArea = ({ filteredSpots, onAddToFav }) => {
  const navigate = useNavigate();

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const mapCenter = {
    lat: 36.5,
    lng: 137.0
  }

  const [activeSpots, setActiveSpots] = useState(null);

  // ズームレベル
  const getZoomLevel = () => {
    const width = window.innerWidth;
    if (width <= 768) return 5.3;   
    if (width <= 1024) return 5.7;  
    return 6;                        
  };

  const [zoomLevel, setZoomLevel] = useState(getZoomLevel());

  useEffect(() => {
    const handleResize = () => {
      setZoomLevel(getZoomLevel());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const favoriteSaved = JSON.parse(localStorage.getItem("Favorites")) || [];

  const isFavorite = activeSpots && favoriteSaved.some(
    (item) => item.name === activeSpots.name
  );

  return (
    <div className={styles.mapWrapper}> 
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}  //地図の幅・高さ（必須）
          center={mapCenter}             //中心座標
          zoom={zoomLevel}               //ズームレベル
        >
        {filteredSpots.map(spot => (
      <Marker
        key={spot.name}
        position={{ lat: spot.lat, lng: spot.lng }}
        title={spot.name}
        onClick={() => setActiveSpots(spot)}
      />
      ))}
      {activeSpots && (
          <InfoWindow
          position={{lat: activeSpots.lat, lng: activeSpots.lng}}
          onCloseClick={() => setActiveSpots(null)}
          >
            <div className={styles.mapInfoWindow}>
              <h3 className={styles.iwTitle}>{activeSpots.name}</h3>
              <div className={styles.iwMeta}>
                <span>{activeSpots.prefecture}</span>
                <span>・</span>
                <span>{activeSpots.type}</span>
              </div>
              <div className={styles.iwActions}>
              <button
                className={
                  isFavorite
                    ? `${styles.iwBtn} ${styles.iwBtnSuccess}`
                    : `${styles.iwBtn} ${styles.iwBtnPrimary}`
                }
                onClick={() => onAddToFav(activeSpots)}
                disabled={isFavorite}
              >
                {isFavorite ? "お気に入り追加済み" : "お気に入りに追加"}
              </button>
                <button className={`${styles.iwBtn} ${styles.iwBtnSecondary}`} onClick={() => navigate(`/detail/${activeSpots.name}`)}>
                  詳細を見る
                </button>
              </div>
            </div>
          </InfoWindow>
        )}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}