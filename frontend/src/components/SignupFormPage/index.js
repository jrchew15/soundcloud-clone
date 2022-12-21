// frontend/src/components/SignupFormPage/index.js
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { checkImage, checkEmail, demoLogin } from "../../utils/functions";
import * as sessionActions from "../../store/session";
import '../Form.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);


    const frontendValidations = () => {
        let errsArr = [];
        if (password !== confirmPassword) {
            errsArr.push('Confirm Password field must be the same as the Password field')
        }
        if (password.length < 6) {
            errsArr.push('Password must be at least 6 characters long')
        }
        if (!checkEmail(email)) {
            errsArr.push('The email your provided is invalid');
        }
        if (username.length > 30) {
            errsArr.push('Username must be 30 characters or fewer');
        }
        // if (imageUrl && !checkImage(imageUrl)) {
        //     errsArr.push('The image you provided is invalid');
        // }

        setErrors(errsArr);

        if (errsArr.length) setShowErrors(true);

        return errsArr
    }

    useEffect(() => {
        if (showErrors) frontendValidations()
    }, [password, email, username])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(false);
        let errsArr = frontendValidations();

        if (errsArr.length) {
            return;
        }

        const res = await dispatch(sessionActions.thunkSignupUser({ firstName, lastName, email, username, password, image }))
            .then(() => history.push('/discover'))
            .catch(async (res) => {
                console.log('ERROR IN THUNK:', res.status, res.statusText)
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
        return res;
    };

    if (sessionUser) return <Redirect to="/" />;

    return (
        <div id='signup-holder'>
            <form className='signup-form' onSubmit={handleSubmit}>
                {errors.length > 0 && (<ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>)}
                <div className="inputs-container">
                    <label htmlFor='signup-first-name'>
                        First Name
                    </label>
                    <input
                        id='signup-first-name'
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label htmlFor='signup-last-name'>
                        Last Name
                    </label>
                    <input
                        id='signup-last-name'
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label htmlFor='signup-email'>
                        Email
                    </label>
                    <input
                        id='signup-email'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor='signup-username'>
                        Username
                    </label>
                    <input
                        id='signup-username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {/* <label htmlFor='signup-imageUrl'>
                        Profile Image (optional)
                    </label>
                    <input
                        id='signup-imagUrl'
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    /> */}
                    <label htmlFor='signup-image'>
                        Image
                    </label>
                    <input type='file' onChange={updateFile} />
                    <label htmlFor='signup-password'>
                        Password
                    </label>
                    <input
                        id='signup-password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor='signup-confirm-password'>
                        Confirm Password
                    </label>
                    <input
                        id='signup-confirm-password'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="modal-buttons" style={{ gridColumn: '1 / 3' }}>
                        <button type="submit">Sign Up</button>
                        <button type='button' className='demo-button' onClick={() => demoLogin(dispatch, history)}>Demo User</button>
                    </div>
                </div>
            </form>
        </div>
    );

    function updateFile(e) {
        const file = e.target.files[0];
        if (file) setImage(file)
    }
}

export default SignupFormPage;
