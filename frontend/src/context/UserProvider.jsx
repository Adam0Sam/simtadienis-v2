import { createContext, useContext, useState, useMemo, useCallback } from "react";
import CONSTANTS from "../constants";

const UserContext = createContext();
/**
 * Custom hook to access the page context.
 * @returns {Object} The page context object.
 * @throws {Error} Throws an error if used outside of a UserProvider.
 */
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useSubPage must be used within a UserProvider");
    }
    return context;
};

/**
 * Provides context for the the current user and login/signup pages.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */

export default function UserProvider({ children }) {
    const [loginActive, setLoginActive] = useState(false);
    const [signupActive, setSignupActive] = useState(false);

    /**
     * Mounts the login component.
     */
    const openLogin = () => {
        setLoginActive(true);
    }

    /**
     * Dismounts the login component.
     */
    const closeLogin = () => {
        setLoginActive(false);
    }

    /**
     * Toggles the login modal active state.
     */
    const toggleLoginActive = () => {
        setLoginActive(prevState => !prevState);
    }

    /**
     * Mounts the signup component.
     */
    const openSignup = () => {
        setSignupActive(true);
    }

    /**
     * Dismounts the signup component.
     */
    const closeSignup = () => {
        setSignupActive(false);
    }

    /**
     * Toggles the signup modal active state.
     */
    const toggleSignupActive = () => {
        setSignupActive(prevState => !prevState);
    }

    /**
     * Represents the name and surname of the current user.
     * @type {Object}
     * @property {string} name - The user's name.
     * @property {string} surname - The user's surname.
     */
    const [userId, setUserId] = useState({ name: '', surname: '' });
    /**
    * Checks if the user exists by verifying if both the name and surname are present.
    *
    * @type {boolean}
    */
    const userIdExists = useMemo(() => {
        return userId.name && userId.surname
    }, [userId.name, userId.surname]);
    /**
     * Updates the user ID with the provided name and surname.
     * If `remove` is true, it clears the user ID.
     * @param {string} name - The new name for the user ID.
     * @param {string} surname - The new surname for the user ID.
     * @param {boolean} remove - Indicates whether to remove the user ID.
     */
    const changeUserId = useCallback((name, surname) => {
        setUserId(prevId => ({ name: name ? name : prevId.name, surname: surname ? surname : prevId.surname }));
    }, []);


    const clearUserId = useCallback(() => {
        setUserId({ name: '', surname: '' });
    }, []);

    const [voteId, setVoteId] = useState(Array(CONSTANTS.CLASS_LIST.length).fill());

    const changeVoteId = useCallback(async (containerId, id) => {
        let newVoteId;
        await setVoteId(prev =>{
            newVoteId = [...prev];
            newVoteId[containerId] = id;
            return newVoteId;
        });
        return newVoteId
    }, []);

    return (
        <UserContext.Provider
            value={{
                loginActive, openLogin, closeLogin, toggleLoginActive,
                signupActive, openSignup, closeSignup, toggleSignupActive,
                userId, userIdExists, changeUserId, clearUserId,
                voteId, changeVoteId
            }}>
            {children}
        </UserContext.Provider>
    );
}