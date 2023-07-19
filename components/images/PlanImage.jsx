export const PlanImage = ({ plan }) => {
    return (
        <div className="img-container">
            <img src={`/assets/${plan}.svg`} className="plan-img" />
        </div>
    )
}