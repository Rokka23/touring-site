import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";

import styles from "./PlanMemo.module.css";

export const PlanMemo = () => {

  const navigate = useNavigate();

  const [memoSpots, setMemoSpots] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const loadPlan = () => {
      const saved = localStorage.getItem('Plan');
      if (saved) {
        setMemoSpots(JSON.parse(saved));
      }
    };
  
    loadPlan(); // 初回読み込み
  
    window.addEventListener('planUpdated', loadPlan);
    return () => window.removeEventListener('planUpdated', loadPlan);
  }, []);

  const handleCardClick = (spot) => {
    if(selectedCards.find(s => s.name == spot.name)) {
      setSelectedCards(selectedCards.filter(s => s.name !== spot.name));
    } else {
      setSelectedCards([...selectedCards, spot])
    }
  }

  // バリデーションと作成プラン保存
  const handleCreatePlan = () => {
    const count = selectedCards.length;

    if(count <= 1) {
      alert('スポットを2箇所以上選択してください。');
      return;
    }else if(count >= 6) {
      alert('スポットは５箇所以内で選択してください。');
      return;
    }

    // 新しいプランを追加する
    const existing = JSON.parse(localStorage.getItem('createdPlans')) || [];
    existing.push(selectedCards);
    localStorage.setItem('createdPlans', JSON.stringify(existing));

    // トーストメッセージ表示させる
    localStorage.setItem('toastMessage', 'プランを作成しました。');

    window.dispatchEvent(new Event('plansUpdated'));
  }

  const onDelete = (name) => {
    // setMemoSpots(memoSpots.filter((s) => s.name != name))
    setMemoSpots(prev => {
      const updated = prev.filter(s => s.name !== name);
      localStorage.setItem('Plan', JSON.stringify(updated));
      return updated;
    });
  }

  return(
    <>
    <div className={styles.planMemoContainer}>
    {memoSpots.map(spot => {
       const selectedIndex = selectedCards.findIndex(s => s.name === spot.name);
       return(
      <div
        key={spot.name}
        className={
          selectedCards.find(s => s.name === spot.name)
            ? `${styles.planMemoCard} ${styles.active}`
            : styles.planMemoCard
        }
        onClick={() => handleCardClick(spot)}
      >
        <h3 className={styles.memoSpotName}>{spot.name}</h3>
        <div className={styles.memoSpotDetail}>
          <p className={styles.spotTag}>{spot.type}</p>
          <p className={styles.spotTag}>{spot.prefecture}</p>
        </div>
        <button 
          className={styles.deleteBtn} 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(spot.name);
          }}
        >
          <IoTrashOutline />
        </button>
        {selectedIndex !== -1 && (
          <span className={styles.planNum}>{selectedIndex + 1}</span>
        )}
      </div>
       )
    })}
    </div>
    <div className={styles.filterActions}>
      <button className={styles.createPlanBtn} onClick={handleCreatePlan}>プランを保存する</button>
    </div>
    <p className={styles.memoInfo}>※スポットをクリックすると選択できます。</p>
</>
  )
}