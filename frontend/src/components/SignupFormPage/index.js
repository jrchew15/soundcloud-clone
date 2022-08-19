// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import '../Form.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.thunkSignupUser({ firstName, lastName, email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label for='signup-first-name'>
                First Name
            </label>
            <input
                id='signup-first-name'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <label for='signup-last-name'>
                Last Name
            </label>
            <input
                id='signup-last-name'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <label for='signup-email'>
                Email
            </label>
            <input
                id='signup-email'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label for='signup-username'>
                Username
            </label>
            <input
                id='signup-username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label for='signup-password'>
                Password
            </label>
            <input
                id='signup-password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <label for='signup-confirm-password'>
            </label>
            Confirm Password
            <input
                id='signup-confirm-password'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;