import { createContext, useContext, useState} from "react";

const AdminContext = createContext();
/**
 * Custom hook that provides access to the AdminContext.
 * @returns {Object} The AdminContext object.
 * @throws {Error} If used outside of an AdminProvider.
 */
export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within a AdminProvider");
    }
    return context;
};

/**
 * Provides context for managing admin-related data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export default function AdminProvider({ children }) {
    const [selectedUser, setSelectedUser] = useState({});
    const [refresh, setRefresh] = useState(false);

    /**
     * Refreshes the list of users.
     */
    const refreshUsers = () => {
        setRefresh(!refresh);
    }

    /**
     * Sets the selected user.
     *
     * @param {Object} user - The selected user object.
     */
    const selectUser = (user) => {
        setSelectedUser(user);
    }

    return (
        <AdminContext.Provider value={{ selectedUser, selectUser, refresh, refreshUsers }}>
            {children}
        </AdminContext.Provider>
    );
}