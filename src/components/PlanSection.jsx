import styles from "./PlanSection.module.css";

export const PlanSection = ({ plans }) => {

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
        </div>
      ))}
    </div>
  )
}