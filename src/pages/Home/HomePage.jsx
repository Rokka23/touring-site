import { useState, useEffect } from 'react'
import { Spots } from '../../data/spots'
import { filterSpots } from '../../utils/filterSpots'
import { Header } from "../../components/Header/Header";
import { FilterPanel } from '../../components/FilterPanel/FilterPanel'
import { MapArea } from '../../components/MapArea/MapArea'
import { PlanSection } from '../../components/PlanSection'
import { SpotList } from "../../components/SpotList/SpotList";
import { RecommendSection } from "../../components/Recommend/RecommendSection";

import styles from "./HomePage.module.css";


export const HomePage = () => {
 const [selectedArea, setSelectedArea] = useState('');
 const [selectedTypes, setSelectedTypes] = useState([]);
 const [selectedSeasons, setSelectedSeasons] = useState([]);
 const [selectedLevels, setSelectedLevels] = useState([]);
 const [filteredSpots, setFilteredSpots] = useState(Spots);
 const [createdPlans, setCreatedPlans] = useState([]);
 const [searchName, setSearchName] = useState('');
 const [isFilterOpen, setIsFilterOpen] = useState(false)

useEffect(() => {
  const loadPlans = () => {
    const saved = localStorage.getItem('createdPlans');
    if (saved) {
      setCreatedPlans(JSON.parse(saved));
    }
  };

  loadPlans(); // 初回読み込み

  window.addEventListener('plansUpdated', loadPlans);
  return () => window.removeEventListener('plansUpdated', loadPlans);
}, []);

 useEffect(() => {
  const message = localStorage.getItem('toastMessage');
  if(message) {
    alert(message);
    localStorage.removeItem('toastMessage');
  };
 }, []);

//  検索ボタン
 const onSearch = () => {
  const result =filterSpots(
    selectedArea, 
    selectedTypes, 
    selectedSeasons, 
    selectedLevels,
  )
  setFilteredSpots(result) 
 }

//  リセットボタン
 const onReset = () => {
  setSelectedArea('')
  setSelectedTypes([])
  setSelectedSeasons([])
  setSelectedLevels([])
  setFilteredSpots(Spots)
 }

 const onChange = (e) => {
  setSelectedArea(e.target.value)}

const handleAddToFav = (spot) => {
  const favSaved = localStorage.getItem('Favorites');
  const currentFav = favSaved ? JSON.parse(favSaved) : [];

  const isFavDuplicate = currentFav.find(item => item.name === spot.name);
  if (isFavDuplicate) {
    alert('すでにお気に入り済みです');
    return;
  }
  alert('お気に入りに追加しました。')
  currentFav.push(spot);
  localStorage.setItem('Favorites', JSON.stringify(currentFav));

  // カスタムイベントを発火して他コンポーネントに通知
  window.dispatchEvent(new Event('favoritesUpdated'));
}


// ワード検索機能
const onSearchByName = () => {
  const result = Spots.filter((spot) => {
    return spot.name.includes(searchName)
});

if(result){
  setFilteredSpots(result);
}
};

  return (
    <>
      <Header 
        searchName={searchName}
        setSearchName={setSearchName}
        onSearchByName={onSearchByName}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
      />
    <main>
    <div className="main-inner">
      <div className={styles.mainBox}>
        <div id="toast" className={styles.toast}></div>
          <FilterPanel
            selectedArea={selectedArea}
            selectedTypes={selectedTypes}
            selectedSeasons={selectedSeasons}
            selectedLevels={selectedLevels}
            setSelectedTypes={setSelectedTypes}
            setSelectedSeasons={setSelectedSeasons}
            setSelectedLevels={setSelectedLevels}
            onChange={onChange}
            onSearch={onSearch}
            onReset={onReset}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            />
        <div className={styles.mainContent}>
          <div className={styles.mainTop}>
              <MapArea 
              filteredSpots={filteredSpots}
              onAddToFav={handleAddToFav}
              />
              <SpotList />
            </div>
      <div className={styles.contentBelow}>
        <div className={styles.plan}>
          <div className={styles.planNav}>
            <h2 className={styles.planTitle}>作成したプラン</h2>
          </div>
          <div className={styles.planContent}>
            <PlanSection
              plans={createdPlans}
            />
          </div>
        </div>
        <div className={styles.recommend}>
          <h2 className={styles.recommendTitle}>おすすめスポット</h2>
          <RecommendSection />
        </div>
      </div>
      </div>
      </div>
      </div>
    </main>
  </>
  )
}