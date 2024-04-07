import Webcam from "react-webcam";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const CustomWebcam = forwardRef(function CustomWebcam({ enabled }, ref) {
    const containerRef = useRef(null);
    const webcamRef = useRef(null);

    useEffect(() => {
        const video = webcamRef.current.video;
        const container = containerRef.current;

        if (video && container) {
            video.width = container.clientWidth;
            video.height = container.clientHeight;
        }
    }, [])

    useImperativeHandle(ref, () => ({
        capture: () => {
            const imageSrc = webcamRef.current.getScreenshot();
            return imageSrc;
        },
    }));

    return (
        <div className="video-container">
            <p className={`errmsg ${!enabled ? 'active' : null} webcam-err`}>Camera is not active</p>
            <Webcam ref={webcamRef} audio={false} mirrored={true}/>
        </div>
    )
});

export default CustomWebcam;