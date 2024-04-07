// User Components
import UserLookup from "./UserLookup";
import UsersTable from "./UsersTable";
import EditTable from "./EditTable";

import { getAllUsers } from '../../utils/api'
import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminProvider";

import io from 'socket.io-client';
import CONSTANTS from "../../constants";

const socket = io.connect(CONSTANTS.SOCKET_URL);

export default function Users() {
    const [allUsers, setAllUsers] = useState([]);
    const { refresh } = useAdmin();

    useEffect(() => {
        getAllUsers().then(data => {
            setAllUsers(data.result);
        });
        socket.on('newUser', (newUser) => {
            setAllUsers(prev => [...prev, newUser]);
        });
        socket.on('updatedUser', (updatedUser) => {
            setAllUsers(prev => {
                const index = prev.findIndex(user => user.name === updatedUser.name && user.surname === updatedUser.surname);
                prev[index].money += updatedUser.money;
                return prev;
            });
        });
        return () => {
            socket.off('newUser');
            socket.off('updatedUser');
        }
    }, [refresh]);


    return (
        <div className="page">
            <div className="header">
                <h2>Users</h2>
            </div>
            <div className='users'>
                <UserLookup users={allUsers} />
                <EditTable />
                <UsersTable users={allUsers} />
            </div>
        </div>
    )
}
