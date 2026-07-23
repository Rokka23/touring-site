import { LoadScript, GoogleMap, Marker, InfoWindow, OverlayView } from "@react-google-maps/api"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./MapArea.module.css";

const mapCenter = {
  lat: 36.5,
  lng: 137.0
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// ズームレベル
const getZoomLevel = () => {
  const width = window.innerWidth;
  if (width <= 768) return 5.7;   
  if (width <= 1024) return 5.7;  
  return 6;                        
};

export const MapArea = ({ filteredSpots, onAddToFav }) => {
  const navigate = useNavigate();
  const [activeSpots, setActiveSpots] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(getZoomLevel());
  // 現在のズーム状況を取得
  const [currentZoom, setCurrentZoom] = useState(zoomLevel)
  
  const mapRef = useRef(null);

  const LABEL_VISIBLE_ZOOM = 7;

  const onLoad = (map) => {
    mapRef.current = map;
  }

  const onZoomChanged = () => {
    if(mapRef.current) {
      setCurrentZoom(mapRef.current.getZoom())
    }
  }

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
          zoom={zoomLevel}     
          onLoad={onLoad}         
          onZoomChanged={onZoomChanged} 
        >
        {filteredSpots.map(spot => (
          <div key={spot.name}>
            <Marker
              key={spot.name}
              position={{ lat: spot.lat, lng: spot.lng }}
              title={spot.name}
              onClick={() => setActiveSpots(spot)}
            />
            {currentZoom >= LABEL_VISIBLE_ZOOM && (
              <OverlayView
                position={{ lat: spot.lat, lng: spot.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({
                  x: 5,           
                  y: -height / 2,  
                })}
              >
                <div className={styles.spotLabel}>
                  {spot.name}
                </div>
              </OverlayView>
            )}
          </div>
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