import { useRef, useState } from "react"

import CustomWebcam from "./CustomWebcam"
import Modal from "../modal/Modal";

import { LiaCameraSolid, LiaTimesSolid } from "react-icons/lia";
import './webcam.css';

/**
 * Renders a modal component with a webcam and controls for taking screenshots and closing the webcam.
 * @param {Object} props - The component props.
 * @param {Function} props.changeImg - The function to call when a screenshot is taken.
 * @param {Function} props.closeWebcam - The function to call when the webcam is closed.
 * @returns {JSX.Element} The rendered WebcamModal component.
 */
export default function WebcamModal({ changeImg, closeWebcam }) {
    const webcamRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);

    /**
     * Takes a screenshot from the webcam and calls the `changeImg` and `closeWebcam` functions.
     */
    const takeScreenshot = () => {
        const imgSrc = webcamRef.current.capture();
        changeImg(imgSrc);
        closeWebcam();
    }

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                setCameraActive(true);
            })
            .catch(error => {
                if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                    console.warn('Camera permission denied by the user.');
                } else {
                    console.error('Error accessing camera:', error);
                }
            });
    }

    return (
        <Modal openOnMount>
            <div className="webcam-container">
                <div className="webcam">
                    <CustomWebcam ref={webcamRef} enabled={cameraActive} />
                    <div className="webcam__controls">
                        <button className="webcam-control take-screenshot-btn" onClick={takeScreenshot}>
                            <LiaCameraSolid />
                        </button>
                        <button className="webcam-control close-webcam-btn" onClick={closeWebcam}>
                            <LiaTimesSolid />
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}