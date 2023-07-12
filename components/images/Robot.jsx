import { robot } from "../../assets"

export const Robot = () => {
    const div_style = {
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        width: "100%"
    }

    const img_style = {
        height: "auto",
        maxHeight: "50vh",
    }

    const robot_svg =
        <div style={div_style} >
            <img
                src={robot}
                style={img_style} />
        </div>

    return robot_svg
}