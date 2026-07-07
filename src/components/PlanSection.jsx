export const PlanSection = ({ plans }) => {

  return (
    <div className="plan-content">
      {plans.map((plan, planIndex) => (
        <div key={planIndex} className="plan-box">
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