import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import '../Form.css';

function LoginForm({ setShowMenu }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(sessionActions.thunkLoginUser({ credential, password }))
            .then(() => history.pushState('/discover'))
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
            <div className='inputs-container'>
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
            </div>
        </form>
    );
}

export default LoginForm;
