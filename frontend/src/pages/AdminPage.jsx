import '../css/admin.css'

import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
// Components
import Admin from '../components/admin/Admin';
import AdminLogin from '../components/admin/AdminLogin';
// Context
import AdminProvider from '../context/AdminProvider';

import { checkIfAdmin } from '../utils/api'

/**
 * Renders the AdminPage component.
 * This component is responsible for validating the admin cache,
 * disabling access if necessary, and rendering the appropriate content.
 *
 * @returns {JSX.Element} The rendered AdminPage component.
 */
export default function AdminPage() {
    const navigate = useNavigate();

    const [access, setAccess] = useState(undefined);

    /**
     * Validates the admin cache stored in the local storage.
     * If the cache is valid and the admin is an admin user, returns true.
     * Otherwise, returns an object with isAdmin set to false and a response message.
     *
     * @returns {Promise<boolean|{isAdmin: boolean, response: string}>} A promise that resolves to true if the cache is valid and the admin is an admin user, or an object with isAdmin set to false and a response message.
     */
    const validateCache = useCallback(async function () {
        try {
            const savedCache = localStorage.getItem('admin');
            if (!savedCache) {
                return { isAdmin: false, response: 'No admin cache' };
            }
            const admin = JSON.parse(savedCache);
            if (typeof admin !== 'object' || !admin.name || !admin.surname || !admin.token) {
                return { isAdmin: false, response: 'Invalid admin cache' };
            }
            const isAdmin = await checkIfAdmin(admin.name, admin.surname);
            if (!isAdmin) {
                return { isAdmin: false, response: 'Not an admin' };
            }
            return true;
        } catch (error) {
            console.error(error);
        }
    }, []);

    /**
     * Disables access for the admin user.
     * Removes the admin cache from the local storage and navigates to the admin login page.
     */
    const disableAccess = useCallback(function () {
        setAccess(false);
        localStorage.removeItem('admin');
        navigate('/admin');
    }, [navigate]);

    /**
     * Enables access for the admin user.
     */
    const enableAccess = useCallback(function () {
        setAccess(true);
        navigate('/admin/users');
    }, [navigate]);

    useEffect(() => {
        validateCache().then((res) => {
            if (res === true) {
                enableAccess();
            }
            else {
                console.error(res);
                disableAccess();
            }
        });
        document.body.style.overflow = 'auto';
    }, [navigate, validateCache, disableAccess, enableAccess]);

    if (access === undefined) {
        return null;
    }

    if (access === false) {
        return <AdminLogin />
    }

    return (
        <AdminProvider>
            <Admin disableAccess={disableAccess} />
        </AdminProvider>
    )
}