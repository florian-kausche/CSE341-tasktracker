import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.role}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard; 