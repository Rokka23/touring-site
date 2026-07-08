import { Spots } from "../../data/spots";
import { usePlanSelection } from "../../contexts/UsePlanSelection";
import { CiCirclePlus } from "react-icons/ci";
import { FaMinusSquare } from "react-icons/fa";

import styles from "./SpotList.module.css";

export const SpotList = () => {

  const { selectedSpots, addSpot, removeSpot, clearSpot } = usePlanSelection();

  const selectedCount = selectedSpots.length;

  // バリデーションと作成プラン保存
  const handleCreatePlan = () => {
    const count = selectedSpots.length;

    if(count <= 1) {
      alert('スポットを2箇所以上選択してください。');
      return;
    }else if(count >= 6) {
      alert('スポットは５箇所以内で選択してください。');
      return;
    }

    // 新しいプランを追加する
    const existing = JSON.parse(localStorage.getItem('createdPlans')) || [];
    existing.push(selectedSpots);
    localStorage.setItem('createdPlans', JSON.stringify(existing));

    // トーストメッセージ表示させる
    localStorage.setItem('toastMessage', 'プランを作成しました。');

    window.dispatchEvent(new Event('plansUpdated'));
  }

  return(
    <div className={styles.planMemo}>
      <div className={styles.SpotListTop}>
        <h2 className={styles.planMemoTitle}>スポット一覧</h2>
        <button className={styles.selectedReset} onClick={() => clearSpot()}>
          リセット
        </button>
      </div>
      <p className={styles.spotCount}>選択中:{selectedCount}件</p>
      <div className={styles.planMemoContainer}>
      {Spots.map(spot => {
        // 選択されているか確認
        const isSelected = selectedSpots.some(item => item.name == spot.name)
        return(
        <div
          key={spot.name}
          className={styles.planMemoCard} 
        >
          <div>
            <h3 className={styles.memoSpotName}>{spot.name}</h3>
            <div className={styles.memoSpotDetail}>
              <p className={styles.spotTag}>{spot.type}</p>
              <p className={styles.spotTag}>{spot.prefecture}</p>
            </div>
          </div>

          {isSelected ? (
            <button onClick={() => removeSpot(spot.name)} className={styles.minusBtn}>
              <FaMinusSquare />
            </button>
          ) : (
            <button onClick={() => addSpot(spot)} className={styles.plusBtn}>
              <CiCirclePlus />
            </button>
          )}
        </div>
        )
      })}
      </div>
      <div className={styles.filterActions}>
        <button className={styles.createPlanBtn} onClick={handleCreatePlan}>プランを作成する</button>
      </div>
      <p className={styles.memoInfo}>※スポットをクリックすると選択できます。</p>
    </div>
  )
}