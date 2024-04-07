// React utilities
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useRef } from 'react';
// Icons
import { faUser, faGauge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Components
import Dashboard from './Dashboard';
import Users from './Users';
import Modal from '../modal/Modal';

export default function Admin({ disableAccess }) {

    const modalRef = useRef(null);

    const handleLogout = () => {
        modalRef.current.open();
    }
    const cancelLogout = () => {
        modalRef.current.close();
    }
    const confirmLogout = () => {
        modalRef.current.close();
        disableAccess();
    }

    return (
        <div className="container">
            <div className="drawer">
                <div className="menu">
                    <NavLink to='dashboard' activeClassName='active' className='menu__icon'>
                        <FontAwesomeIcon icon={faGauge} />
                    </NavLink>
                    <NavLink to="users" activeClassName='active' className='menu__icon'>
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                    <button className='menu__icon logout' onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            </div>
            <div className="content">
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="*" element={<Navigate to='/admin/dashboard' />} />
                </Routes>
            </div>
            <div className="sidebar">
            </div>
            <Modal ref={modalRef} customClassNames='dialog'>
                <h2 className='dialog-title'>Are you sure you want to logout?</h2>
                <div className="controls">
                    <button className="dialog-button logout" onClick={confirmLogout}>Logout</button>
                    <button className="dialog-button cancel" onClick={cancelLogout}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}