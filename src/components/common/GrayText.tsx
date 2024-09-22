
interface GrayTextProps {
    text: string;
}

export default function GrayText(props: GrayTextProps) {
    return <div style={{ 
        color: "#abababab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    }}>
        {props.text}
    </div>
}