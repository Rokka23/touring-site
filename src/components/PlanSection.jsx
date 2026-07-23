import styles from "./PlanSection.module.css";
import { navigateUrl } from "../utils/navigateUrl";

export const PlanSection = ({ plans }) => {
const handleNavigate = (id) => {
const targetPlan = plans.find((plan) => plan.id === id);
const spotsData = targetPlan.spots.map((spot) => [spot.lat, spot.lng]);

const url = navigateUrl(spotsData);
window.open(url, "_blank");
}
  return (
    <div className={styles.planContent}>
      {plans.map((plan, planIndex) => (
        <div key={planIndex} className={styles.planBox}>
          <h3>{plan.name}</h3>
          <ol className={styles.spotNumberList}>
            {plan.spots.map((spot, spotIndex) => (
              <li key={spot.name ?? spotIndex} className={styles.spotNumberItem}>
                {spot.name}
              </li>
            ))}
          </ol>
          <button onClick={() => handleNavigate(plan.id)}>ナビ開始</button>
        </div>
      ))}
    </div>
  )
}