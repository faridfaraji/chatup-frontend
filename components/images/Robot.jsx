import constants from "../../constants"

export const Robot = () => {
    return (
        <div className="robot-box" >
            <img className="robot" src={constants.robot_src} />
        </div>
    )
}

export const SmallRobot = () => {
    return (
        <div className="small-robot-box" >
            <img className="robot" src={constants.robot_png} />
        </div>
    )
}
