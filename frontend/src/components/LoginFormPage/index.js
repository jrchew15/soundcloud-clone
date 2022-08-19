import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../Form.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.thunkLoginUser({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            {(errors.length ? (<ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>) : null)}
            <label for='login-credential'>
                Username or Email
            </label>
            <input
                id='login-credential'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
            />
            <label for='login-password'>
                Password
            </label>
            <input
                id='login-password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Log In</button>
        </form>
    );
}

export default LoginFormPage;
