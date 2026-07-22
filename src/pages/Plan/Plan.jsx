import { Header } from "../../components/Header/Header"
import { BottomTab } from "../../components/BottomTab/BottomTab"
import { useState } from "react"
import { SpotList } from "../../components/SpotList/SpotList";
import { PlanSection } from "../../components/PlanSection";
import { useCreatedPlans } from "../../contexts/CreatedPlans/useCreatedPlans";

import styles from "./Plan.module.css";

export const Plan = () => {
  const [isActiveTab, setISActiveTab] = useState('spots')
  const { createdPlans } = useCreatedPlans();

  return(
    <>
      <Header />
      <main>
        <div className={styles.headerTab}>
          <button 
            className={`${styles.buttonTab} ${isActiveTab === 'spots' ? styles.tabActive : ''}`}
            onClick={() => setISActiveTab('spots')}
          >
            スポット一覧
          </button>
          <button
            className={`${styles.buttonTab} ${isActiveTab === 'plans' ? styles.tabActive : ''}`}
            onClick={() => setISActiveTab('plans')}
          >
            作成済みプラン
          </button>
        </div>

        <div>
          {isActiveTab === 'spots' ?   <SpotList />  : <div className={styles.planBox}><PlanSection plans={createdPlans}/></div>}
        </div>
      </main>
      <BottomTab />
    </>
  )
}