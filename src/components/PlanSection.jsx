import styles from "./PlanSection.module.css";

export const PlanSection = ({ plans }) => {

  return (
    <div className={styles.planContent}>
      {plans.map((plan, planIndex) => (
        <div key={planIndex} className={styles.planBox}>
          <h3>プラン {planIndex + 1}</h3>
          {plan.map((spot, spotIndex) => (
            <p key={spot.name}>
              {spotIndex + 1}. {spot.name}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}