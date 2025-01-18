import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', { name, email, password, role });
            history.push('/login'); // Redirect to login
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register; 