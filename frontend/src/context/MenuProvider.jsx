import { createContext, useContext, useState } from "react";

const MenuContext = createContext();
/**
 * Custom hook to access the page context.
 * @returns {Object} The page context object.
 * @throws {Error} Throws an error if used outside of a MenuProvider.
 */
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useSubPage must be used within a MenuProvider");
    }
    return context;
};

/**
 * Provides context for interacting with the Menu component.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export default function MenuProvider({ children }) {
    const [menuActive, setMenuActive] = useState(false);

    /**
     * Opens the hamburger slide-in menu
     */
    const openMenu = () => {
        setMenuActive(true);
    }

    /**
     * Closes the hamburger slide-in menu
     */
    const closeMenu = () => {
        setMenuActive(false);
    }

    /**
     * Toggles the hamburger menu active state
     */
    const toggleMenu = () => {
        setMenuActive(prevState => !prevState);
    }

    return (
        <MenuContext.Provider value={{
            menuActive,
            openMenu,
            closeMenu,
            toggleMenu,
        }}>
            {children}
        </MenuContext.Provider>
    );
}