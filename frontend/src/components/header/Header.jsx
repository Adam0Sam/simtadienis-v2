import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import LanguageSelector from './LanguageSelector';

import './header.css'
import moneyImg from '../../assets/images/flying-money.png';

/**
 * Renders the header component.
 * @returns {JSX.Element} The header component.
 */
export default function Header() {

    // will the home page have overflowing content?

    const [hidden, setHidden] = useState(false);
    // const [pastScrollY, setPastScrollY] = useState(0);

    // useEffect(() => {
    //     console.log('header mounted');
    //     const handleScroll = () => {
    //         const currentScrollY = window.scrollY;
    //         const scrollThreshold = 125; // in vh

    //         if (pastScrollY > currentScrollY) {
    //             setHidden(false);
    //         }
    //         else {
    //             setHidden(currentScrollY > scrollThreshold);
    //         }

    //         setPastScrollY(currentScrollY);
    //     }
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [pastScrollY]);

    return (
        <header id='header' >
            <div id='header__selector' className={hidden ? 'hidden' : ''}>
                <LanguageSelector />
            </div>
            <img className='header-money money-upper' src={moneyImg} alt='flying money' />
            <div id='header__title'>
                <span className='title-text title-one'>
                    <FormattedMessage id="header.title.one" />
                </span>
                <span className='title-text title-two'>
                    <FormattedMessage id="header.title.two" />
                </span>
                <span className='title-text title-three'>
                    <FormattedMessage id="header.title.three" />
                </span>
                <span className='title-text title-four'>
                    <FormattedMessage id="header.title.four" />
                </span>
            </div>
            <img className='header-money money-lower' src={moneyImg} alt='flying money' />
        </header>
    )
}