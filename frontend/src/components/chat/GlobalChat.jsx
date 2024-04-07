import './chat.css';
import MessageInput from './MessageInput';
import ChatLog from './ChatLog';

import { usePage } from "../../context/PageProvider";

export default function GlobalChat() {
    const { currentUserPageName } = usePage();

    return (
        <div className={`user-page side-page chat-page ${currentUserPageName === 'chat' ? 'active' : ''}`}>
            <ChatLog />
            <MessageInput />
        </div>
    )
}