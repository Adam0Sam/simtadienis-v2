import { createContext, useContext, useState } from "react";

const PageContext = createContext();
/**
 * Custom hook to access the page context.
 * @returns {Object} The page context object.
 * @throws {Error} Throws an error if used outside of a PageProvider.
 */
export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("useSubPage must be used within a PageProvider");
    }
    return context;
};

/**
 * Provides context for the UserPage.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */

export default function PageProvider({ children }) {
    const [currentUserPageName, setCurrentUserPageName] = useState('home');
    // refers to the components in App.jsx
    const validUserPageNames = ['home', 'leaderboard', 'gallery', 'chat', 'video'];

    /**
     * Changes the user subpage.
     * @param {string} pageName - The name of the subpage.
     */
    const changeUserPage = (pageName) => {
        if (validUserPageNames.includes(pageName)) {
            setCurrentUserPageName(pageName);
        }
    }

    const resetPage = () => {
        setCurrentUserPageName('home');
    }

    return (
        <PageContext.Provider
            value={{
                currentUserPageName,
                validUserPageNames,
                resetPage,
                changeUserPage,
            }}>
            {children}
        </PageContext.Provider>
    );
}