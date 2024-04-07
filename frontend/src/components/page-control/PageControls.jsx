import BackArrow from "../BackArrow";
import { LiaHomeSolid } from "react-icons/lia";

import { usePage } from '../../context/PageProvider';
import { useMenu } from '../../context/MenuProvider';
import { useUser } from '../../context/UserProvider';

import './pageControls.css';

/**
 * Renders the page controls component.
 * @returns {JSX.Element} The rendered page controls component.
 */
export default function PageControls() {
    const { menuActive, toggleMenu, closeMenu } = useMenu();
    const { closeLogin, closeSignup, loginActive, signupActive } = useUser();
    const { currentUserPageName, changeUserPage } = usePage();

    let extraBtn;
    if (loginActive || signupActive) {
        const handleArrowClick = loginActive ? () => closeLogin() : () => closeSignup();
        extraBtn = <BackArrow handleArrowClick={handleArrowClick} />;
    }
    else if (currentUserPageName !== 'home') {
        const handleHomeClick = () => {
            if(menuActive) closeMenu();
            changeUserPage('home');
        }
        extraBtn = (
            <button className='go-home' onClick={handleHomeClick}>
                <LiaHomeSolid />
            </button>
        )
    }
    else {
        extraBtn = <div></div>;
    }


    return (
        <div className={`page__controls ${menuActive ? 'active' : ''} in-${currentUserPageName}`}>
            {extraBtn}
            <button id="hamburger" onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
        </div>
    )
}