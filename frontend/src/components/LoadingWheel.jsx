import Modal from "./modal/Modal"
export default function LoadingWheel() {
    return (
        <Modal openOnMount customClass='center'>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Modal>
    )
}