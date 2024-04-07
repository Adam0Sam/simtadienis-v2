import { useEffect, useRef } from "react"
import Modal from "./Modal";

export default function ErrorModal({ status, errorMessage, dismissable }) {
    const modalRef = useRef(null);

    const dismissModal = () => {
        modalRef.current.close();
    }

    useEffect(() => {
        modalRef.current.open();
    }, []);

    return (
        <Modal ref={modalRef} customClassNames={`error__modal ${dismissable ? 'dismissable' : 'not-dismissable'}`} openOnMount>
            <img className='error-image' src="https://100dayscss.com/codepen/alert.png" alt='alert' width="44" height="38" />
            <div className="error__info">
                <span className="error-title">{status}</span>
                <p className='error-message'>{errorMessage}</p>
            </div>
            {dismissable && <div className="error-dismiss-btn" onClick={dismissModal}>Dismiss</div>}
        </Modal>
    )

}

