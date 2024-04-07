import { FormattedMessage } from 'react-intl';

import Login from "./Login";
import SignUp from "./SignUp";
import PageNav from "../page-control/PageNav";

import { useUser } from '../../context/UserProvider';

import './user.css';

/**
 * Renders the NoUser component.
 * This component is responsible for rendering the login and signup buttons,
 * and conditionally rendering the Login or SignUp component based on user interaction.
 *
 * @returns {JSX.Element} The rendered NoUser component.
 */
export default function NoUser() {
    const { loginActive, signupActive, openLogin, openSignup } = useUser();

    if (loginActive) {
        return <Login />
    }
    else if (signupActive) {
        return <SignUp />
    }

    return (
        <>
            <div className="user__buttons">
                <button className="user-button login-btn" onClick={openLogin}>
                    <FormattedMessage id='login' />
                </button>
                <button className="user-button signup-btn" onClick={openSignup}>
                    <FormattedMessage id='signup' />
                </button>
            </div>
            <PageNav />
        </>
    )

}