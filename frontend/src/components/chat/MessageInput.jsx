import { useUser } from '../../context/UserProvider';
import { useMenu } from '../../context/MenuProvider';
import { useState } from 'react';

import currentDate from '../../date';
import { useIntl } from 'react-intl';

import { sendGlobalChat } from '../../utils/api';

import { LiaPaperPlaneSolid } from "react-icons/lia";

const MAX_MESSAGE_LENGTH = 100;
const SHAKE_ANIMATION_DURATION = 500; // in ms, as defined in css 
const BUTTON_TIMEOUT_DURATION = 500; // in ms


/**
 * Renders a message input component.
 * @returns {JSX.Element} The message input component.
 */
export default function MessageInput() {
    const { userId, userIdExists } = useUser();
    const { openMenu } = useMenu();

    const intl = useIntl();

    const [inputMessage, setInputMessage] = useState('');
    const [shake, setShake] = useState(false);
    const [buttonTimeOut, setButtonTimeOut] = useState(false);

    /**
     * Sends a message to the global chat.
     * @param {Event} e - The submit event.
     */
    const sendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.length > MAX_MESSAGE_LENGTH || inputMessage.length <= 0) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, SHAKE_ANIMATION_DURATION);
            return;
        }

        const payload = {
            user: `${userId.name} ${userId.surname}`,
            content: inputMessage,
            time: currentDate()
        }
        await sendGlobalChat(payload)
        setInputMessage(''); 
        setButtonTimeOut(true);
        setTimeout(()=>{
            setButtonTimeOut(false);
        }, BUTTON_TIMEOUT_DURATION)  
    }

    return (
        <form className={`chat__form ${userIdExists ? '' : 'disabled'}`} onSubmit={sendMessage} onClick={userIdExists ? null : openMenu} autoComplete='off'>
            <div className='chat-input-container'>
                <input className='chat-input'
                    type="text"
                    name="message"
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                    placeholder={userIdExists ? intl.formatMessage({ id: 'message' }) : intl.formatMessage({ id: 'login' })}
                    disabled={!userIdExists || buttonTimeOut}>
                </input>
                <div className={`input-counter ${inputMessage.length > MAX_MESSAGE_LENGTH || inputMessage.length <= 0 ? 'invalid' : ''} ${shake ? 'shake' : ''} digit`}>
                    <p>{inputMessage.length}/{MAX_MESSAGE_LENGTH}</p>
                </div>
            </div>
            <button className={`chat-submit-btn ${buttonTimeOut || !userIdExists ? 'disabled' : ''}`} type="submit">
                <LiaPaperPlaneSolid />
            </button>
        </form>
    )
}
