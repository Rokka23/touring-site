import { Spots } from "../../data/spots";
import { useCreatedPlans } from "../../contexts/CreatedPlans/useCreatedPlans";
import { usePlanSelection } from "../../contexts/PlanSelection/usePlanSelection";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaMinusSquare } from "react-icons/fa";

import styles from "./SpotList.module.css";

export const SpotList = () => {

const [isFormOpen, setIsFormOpen] = useState(false);
const [planName, setPlanName] = useState('');
const [errormessage, setErrormessage] = useState('')
const { addPlan } = useCreatedPlans();
const { selectedSpots, addSpot, removeSpot, clearSpot } = usePlanSelection();
const selectedCount = selectedSpots.length;

  // プラン作成ボタン押下
  const handleCreatePlan = () => {
    const count = selectedSpots.length;

    if(count <= 1) {
      alert('スポットを2箇所以上選択してください。');
      return;
    }else if(count >= 6) {
      alert('スポットは５箇所以内で選択してください。');
      return;
    } else {
      setIsFormOpen(true);
    }
  }

  // 保存ボタン押下
  const handleSavePlan = () => {
    const error = validatePlanName(planName);

    if(error) {
      setErrormessage(error);
      return;
    }
    
    const newPlan = {
      id: Date.now(),
      name: planName.trim(),  
      spots: selectedSpots, 
      createdAt: new Date().toISOString(),
    }

    // 新しいプランを追加
    addPlan(newPlan)

    window.dispatchEvent(new Event('plansUpdated'));

    setIsFormOpen(false);
  }

  // プラン名入力チェック
  function validatePlanName (name) {
    // 空白は除外
    const trimmed = name.trim();

    if(trimmed.length === 0) return 'プラン名を入力してください。';
    if(trimmed.length > 30) return 'プラン名は30文字以内で入力してください。';
    // エラーない場合
    return null;
  }

  // キャンセルボタン押下
  const handleCancelPlan = () => {
    setIsFormOpen(false);
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

      {isFormOpen && (
        <div className={styles.modalOverlay} >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.modalTitle}>プラン名を入力</h3>
            <input
            type="text"
            className={styles.modalInput}
            value={planName}
            onChange={(e) => {
              setPlanName(e.target.value);
              if (errormessage) setErrormessage("");
            }}
            placeholder="プラン名を入力してください。"
            />
            {errormessage && <p className={styles.modalError}>{errormessage}</p>}

            <div className={styles.modalActions}>
              <button className={styles.modalCancelBtn} onClick={handleCancelPlan}>キャンセル</button>
              <button className={styles.modalSaveBtn} onClick={handleSavePlan}>プラン保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}