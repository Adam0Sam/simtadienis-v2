import Modal from "../modal/Modal";

import { LiaPlusSquare, LiaTrashSolid } from "react-icons/lia";

/**
 * Renders the EditProfile component.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.closeEdit - The function to close the edit profile modal.
 * @param {Function} props.openWebcam - The function to open the webcam.
 * @param {string} props.imgSrc - The source URL of the current user profile image.
 * @param {Function} props.deleteImg - The function to delete the user profile image.
 * @returns {JSX.Element} The rendered EditProfile component.
 */
export default function EditProfile({ closeEdit, openWebcam, imgSrc, deleteImg }) {
    return (
        <Modal openOnMount>
            <div className="webcam-container" onClick={closeEdit}>
                <div className="webcam">
                    <img src={imgSrc} alt='Current User Profile'></img>
                    <div className="webcam__controls">
                        <button className="img-control new-profile-btn">
                            <LiaPlusSquare onClick={() => { closeEdit(); openWebcam(); }} />
                        </button>
                        <button className="img-control delete-profile-btn">
                            <LiaTrashSolid onClick={deleteImg} />
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}