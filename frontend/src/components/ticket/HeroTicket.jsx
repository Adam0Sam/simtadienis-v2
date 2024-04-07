import { FormattedMessage } from 'react-intl';
import { useRef, useEffect, useState } from 'react';
import { useMenu } from '../../context/MenuProvider';
import './ticket.css';

/**
 * Renders the HeroTicket component.
 * @returns {JSX.Element} The rendered HeroTicket component.
 */
export default function HeroTicket() {
    const ticketLoweref = useRef(null);

    const { openMenu } = useMenu();

    /**
     * Handles the click event on the ticket button.
     */
    const handleClick = () => {
        ticketLoweref.current.classList.add('clicked');
        setTimeout(() => {
            openMenu();
        }, 600)
        ticketLoweref.current.addEventListener('animationend', () => {
            ticketLoweref.current.classList.remove('clicked');
        });
    }

    /**
     * Calculates the time left until a specific date.
     * @returns {string} The formatted time left.
     */
    const calculateTimeLeft = () => {
        const now = new Date();
        // march - 2, 22nd - 22
        const endDate = new Date(now.getFullYear(), 2, 22, 18, 0, 0, 0);
        if(new Date() > endDate) return '00h, 00m';
        const timeDifference = endDate.getTime() - now.getTime();
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        return `${String(hours).padStart(2, '0')}h, ${String(minutes).padStart(2, '0')}m`;
    };

    /**
     * State for storing the time left.
     */
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    /**
     * Updates the time left every minute.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id='ticket'>
            <div id='ticket__upper' >
                <div className='ticket__info'>
                    <p className='ticket-text'>
                        <FormattedMessage id='ticket.text' />
                    </p>
                    <p className='ticket-date'>
                        <FormattedMessage id='left' />
                        {timeLeft}
                    </p>
                </div>
            </div>
            <div id='ticket__lower' ref={ticketLoweref}>
                <button id='ticket-button' onClick={handleClick}>
                    <FormattedMessage id='ticket.button' />
                </button>
            </div>
        </div>
    )
}