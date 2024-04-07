import { usePage } from '../../context/PageProvider';
import { useUser } from '../../context/UserProvider';
import { useRef, useCallback, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';

import GalleryImage from './GalleryImage';
import GalleryCount from './GalleryCount';
import './gallery.css';

import CONSTANTS from '../../constants';

/**
 * Renders the Gallery component.
 * @component
 * @returns {JSX.Element} The rendered Gallery component.
 */
export default function Gallery() {
    const { currentUserPageName } = usePage();
    const { userId } = useUser();
    const galleryCntRef = useRef();


    useEffect(() => {
        galleryCntRef.current.clearCnt();
    }, [userId])
    
    /**
     * Increases the count of the submitted images.
     */
    const increaseCnt = useCallback(() => {
        galleryCntRef.current.increaseCnt();
    }, [galleryCntRef])
    
    /**
     * Decreases the count of the submitted images.
     */
    const decreaseCnt = useCallback(() => {
        galleryCntRef.current.decreaseCnt();
    }, [galleryCntRef])

    return (
        <div className={`user-page side-page gallery ${currentUserPageName === 'gallery' ? 'active' : ''}`}>
            <h3 className='gallery-title'>
                <FormattedMessage id='your.submissions' />
            </h3>
            <GalleryCount ref={galleryCntRef} totalCnt={CONSTANTS.GALLERY_CNT} />
            <li className='gallery__images'>
                {Array(CONSTANTS.GALLERY_CNT).fill().map((_, i) => <GalleryImage position={i} increaseCnt={increaseCnt} decreaseCnt={decreaseCnt} key={i}/>)}
            </li>
        </div>
    )
}