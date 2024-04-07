import { useEffect, useState, useRef } from 'react';
import { usePage } from '../../context/PageProvider';
import { getGlobalChat } from '../../utils/api';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import CONSTANTS from '../../constants';

const socket = io.connect(CONSTANTS.SOCKET_URL);

/**
 * Renders the chat log component.
 * @returns {JSX.Element} The chat log component.
 */
export default function ChatLog() {
    const [chatLog, setChatLog] = useState([]);
    const { currentUserPageName } = usePage();
    const chatLogRef = useRef(null);


    useEffect(() => {
        if (currentUserPageName !== 'chat') {
            socket.off('chat');
            return;
        }
        getGlobalChat().then(data => {
            setChatLog(data.payload);
            setTimeout(() => {
                chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
            }, 1);
        });
        socket.on('chat', (message) => {
            setChatLog(prev => [...prev, message]);
            setTimeout(() => {
                chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
            }, 1);
        });
    }, [currentUserPageName]);


    return (
        <div className='chat__log' ref={chatLogRef}>
            {chatLog.map(message => (
                <ChatMessage message={message} key={message.user + message.time + message.content} />
            ))}
        </div>
    );
}