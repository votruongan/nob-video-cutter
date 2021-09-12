import DesktopTimeline from "../components/DesktopTimeline";
import DesktopVideoPreview from "../components/DesktopVideoPreview";
import "../styles/Desktop.css"

function Desktop() {
    return (
        <div className="Desktop">
            <DesktopVideoPreview />
            <DesktopTimeline />
        </div>
    );
}

export default Desktop;
