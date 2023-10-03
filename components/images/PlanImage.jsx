import constants from "../../constants"

export const PlanImage = ({ plan }) => {
    return (
        <div className="img-container">
            <img src={constants[`${plan}_src`]} className="plan-img" />
        </div>
    )
}