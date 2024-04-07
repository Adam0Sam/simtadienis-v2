import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react"
import { createPortal } from "react-dom";
import './modal.css'


/**
 * Modal component that displays a dialog box.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} props.customClassNames - Additional CSS class names to be applied to the modal.
 * @param {boolean} props.openOnMount - Determines whether the modal should be opened when mounted.
 * @param {React.Ref} ref - The ref object used to expose the open and close methods of the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const Modal = forwardRef(({ children, customClassNames, openOnMount, ...props }, ref) => {
    const dialogRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        dialogRef.current.showModal();
        setIsOpen(true);
    }

    const closeModal = () => {
        dialogRef.current.close();
        setIsOpen(false);
    }

    useImperativeHandle(ref, () => ({
        open: openModal,
        close: closeModal
    }));

    useEffect(() => {
        if (openOnMount) {
            openModal();
        }
    }, [openOnMount]);

    return (
        createPortal(
            <dialog ref={dialogRef} className={`modal ${customClassNames ? customClassNames : ''} ${isOpen ? 'open' : 'closed'}`} {...props}>
                {children}
            </dialog>,
            document.querySelector('#modal-root')
        )
    )
});

export default Modal;
