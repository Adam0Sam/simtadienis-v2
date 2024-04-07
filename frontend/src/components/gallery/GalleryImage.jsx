import { useEffect, useRef, useState, useCallback } from 'react';
import { useUser } from '../../context/UserProvider';

import Modal from '../modal/Modal';

import { handleDriveData } from "../../utils/api"

import { LiaPlusSolid, LiaTrashSolid } from 'react-icons/lia';

const googleDriveUrl = (id) => `https://lh3.googleusercontent.com/d/${id}=w1000?authuser=0`;


/**
 * Represents a gallery image component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.position - The position of the image in the gallery.
 * @param {Function} props.increaseCnt - The function to increase the count.
 * @param {Function} props.decreaseCnt - The function to decrease the count.
 * @returns {JSX.Element} The gallery image component.
 */
export default function GalleryImage({ position, increaseCnt, decreaseCnt }) {
    // very hacky, figure out how to nest svgs in input or upload file with <button>
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { userId } = useUser();

    /**
     * Fetches the image from the google drive.
     *
     * @returns {Promise<string>} A promise that resolves to the image URL.
     */
    const fetchImage = useCallback(async () => {
        const image = await handleDriveData(userId.name, userId.surname, position, 'get')
        if (!image.response){
            return '';
        } 
        return image;
    }, [userId.name, userId.surname, position])

    useEffect(() => {
        if (!userId.name || !userId.surname) return;
        fetchImage().then(image => {
            setImage(image.response);
            if (image.response) {
                increaseCnt();
            }
        });
    }, [userId, increaseCnt, fetchImage])

    const handleUpload = () => {
        if (inputRef.current) inputRef.current.click();
    }

    /**
     * Checks if the file is an image.
     *
     * @param {File|string} file - The file to check.
     * @returns {boolean} True if the file is an image, false otherwise.
     */
    const isImage = (file) => {
        if (file?.type) return file.type.includes('image');
        return file.includes('image');
    }

    const reader = new FileReader();
    reader.onload = async () => {
        try {
            setImage(reader.result);
            await handleDriveData(userId.name, userId.surname, position, 'set', reader.result);
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    }

    /**
     * Handles the file change event.
     * 
     * @param {Event} e - The file change event.
     */
    const handleFileChange = (e) => {
        if (!isImage(e.target.files[0])) return;
        setLoading(true);
        reader.readAsDataURL(e.target.files[0]);
        increaseCnt();
        setLoading(false);
    }

    const handleDelete = () => {
        setImage(null);
        handleDriveData(userId.name, userId.surname, position, 'delete');
        decreaseCnt();
    }

    return (
        <ul className='gallery-image' onClick={handleUpload}>
            {image &&
                <img className="gallery-img-src" src={
                    isImage(image) ? image : googleDriveUrl(image)
                } alt={`submission ${position}`}></img>}
            {!image
                ?
                (<>
                    <button type='file' className="gallery-btn gallery-upload-btn">
                        <LiaPlusSolid />
                    </button>
                    <input ref={inputRef} type='file' className='hidden' accept='image/*' onChange={handleFileChange} />
                </>)
                :
                (
                    <button className='gallery-btn gallery-delete-btn' onClick={handleDelete}>
                        <LiaTrashSolid />
                    </button>
                )
            }
            {loading &&
                <Modal openOnMount>
                    <div className='gallery-loading'>Loading...</div>
                </Modal>
            }
        </ul>
    )
}