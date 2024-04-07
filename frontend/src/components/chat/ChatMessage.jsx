import { useState, useEffect, useCallback } from "react";
import { getUserData } from "../../utils/api";
import { FormattedMessage } from "react-intl";
import { useInView } from 'react-intersection-observer';
import Modal from "../modal/Modal"
import UserWindow from "../user/UserWindow";

import adBanner from '../../assets/images/weborado-full.png';
import unkownUserImg from "../../assets/images/unkown-user-new.png";

import currentDate from "../../date";
import LoadingWheel from "../LoadingWheel";

const AD_URL = 'https://paskyra.weborado.lt';

export default function ChatMessage({ message }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userProfileData, setUserProfileData] = useState({});
    const { ref, inView } = useInView({ threshold: 0, fallbackInView: true });
    const [loading, setLoading] = useState(true);

    const isAd = message?.ad;
    const isAdmin = message?.admin;

    const fetchUserData = useCallback(async () => {
        try {
            const userId = message.user.split(' ');
            const name = userId[0];
            const surname = userId[1];
            const data = await getUserData({ name, surname });
            return data.response[0];
        } catch (err) {
            console.error(err);
        }
    }, [message.user]);

    useEffect(() => {
        if (inView) {
            fetchUserData().then(response => {setUserProfileData(response); setLoading(false)});
        }
    }, [fetchUserData, inView]);

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    let messageContent = message?.content;
    if (isAd) {
        messageContent = (
            <>
                <p>
                    <FormattedMessage id='ad' />
                    <span className="digit">lic100</span>
                </p>
                <img className="ad-banner" src={adBanner} alt="domenai.lt banner"></img>
            </>)
    }
    else if (isAdmin) {
        messageContent = (
            <FormattedMessage id='admin.message' />
        )
    }

    return (
        <>
            <div key={message.user + (isAd ? currentDate() : message.time) + message.content}
                className={`chat__message ${isAd ? 'ad' : ''}`}
                onClick={isAd ? () => window.open(AD_URL, '_blank', 'noopener,noreferrer') : openModal}
                ref={ref}>
                <div className='message__upper'>
                    <div className="message__user">
                        {!isAd && !isAdmin &&
                            loading ? <LoadingWheel /> :
                            <div className="mini-profile-container">
                                <img className="mini-profile" src={userProfileData?.image || unkownUserImg} alt="user">
                                </img>
                            </div>
                        }
                        <p className='message-user'>
                            {isAdmin ? <FormattedMessage id='admin' /> : message.user}
                        </p>
                    </div>
                    <p className='digit'>{isAd ? currentDate() : message.time}</p>
                </div>
                <p className='message-content'>
                    {messageContent}
                </p>
            </div>
            {
                modalIsOpen &&
                <Modal openOnMount>
                    <UserWindow userData={userProfileData} user={message.user} closeModal={closeModal} isAd={isAd} />
                </Modal>
            }
        </>
    )
}