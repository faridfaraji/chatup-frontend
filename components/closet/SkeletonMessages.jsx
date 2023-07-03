import { SkeletonBodyText } from "@shopify/polaris"

const SkeletonMessage = (props) => {
    const sided = props.side % 2
    console.log(props)
    console.log(props.side)
    console.log(props.side % 2)
    console.log(sided)
    return (
        <div style = {{

            display: 'flex',
            
        }}>
        <div
            style={{
                display: 'flex',
                justifyContent: sided ? 'flex-start' : 'flex-end',
                marginBottom: '10px',
                marginLeft: sided ? "10px" : "0px",
                marginRight: sided ? "0px" : "10px",
                backgroundColor: sided ? '#e5e5e5' : '#008cff',
                color: sided ? '#000' : '#fff',
                borderRadius: '5px',
                padding: '10px',
                maxWidth: '70%',
            }}
        >
            <SkeletonBodyText lines={props.lines} />
        </div>
        </div>

    )
}

export const SkeletonMessages = (props) => {
    const skList = []
    for (var i = 0; i < props.messages; i++) {
        skList.push(<SkeletonMessage lines={Math.ceil(Math.random() * 3)} side={i} />)
    }
    return skList
}


            // </div> */}
