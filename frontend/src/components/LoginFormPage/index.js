import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import '../Form.css';

function LoginForm({ setShowMenu }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setShowMenu(false);
        dispatch(sessionActions.thunkLoginUser({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) setErrors([data.message]);
            });
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            {(errors.length > 0 && (<ul className='errors' style={{ gridRow: '1', gridColumn: '1/3' }}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>))}
            <label htmlFor='login-credential' style={{ gridRow: '2' }}>
                Username or Email
            </label>
            <input
                id='login-credential'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                style={{ gridRow: '2' }}
            />
            <label htmlFor='login-password' style={{ gridRow: '3' }}>
                Password
            </label>
            <input
                id='login-password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ gridRow: '3' }}
            />
            <button type="submit" style={{ gridRow: '4' }}>Log In</button>
        </form>
    );
}

export default LoginForm;
