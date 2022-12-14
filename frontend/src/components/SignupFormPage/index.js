// frontend/src/components/SignupFormPage/index.js
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { checkImage, checkEmail, demoLogin } from "../../utils/functions";
import { allowed_image_extensions } from "../../utils/default_images";
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
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const [usingImageFile, setUsingImageFile] = useState(true);
    const [submitting, setSubmitting] = useState(false);

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

        if (image) {
            if (image.type.split('/')[0] !== 'image') {
                errsArr.push('Uploaded file must be an image')
            }

            if (!allowed_image_extensions.includes(image.type.split('/')[1])) {
                errsArr.push('Image must be a ' + allowed_image_extensions.join(', '))
            }

            if (image.size > 1e6) {
                errsArr.push('Image file must be less than 1MB in size')
            }
        }

        if (imageUrl && !allowed_image_extensions.some(ext => imageUrl.endsWith(ext))) {
            errsArr.push('Image must be a ' + allowed_image_extensions.join(', '))
        }

        setErrors(errsArr);

        if (errsArr.length) setShowErrors(true);

        return errsArr
    }

    useEffect(() => {
        if (showErrors) frontendValidations()
    }, [password, email, username])

    useEffect(() => {
        if (submitting) {
            handleSubmit()
        }
    }, [submitting])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(false);
        let errsArr = frontendValidations();

        if (errsArr.length) {
            setSubmitting(false)
            return;
        }

        const res = await dispatch(sessionActions.thunkSignupUser({ firstName, lastName, email, username, password, image }))
            .then(() => history.push('/discover'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            }).finally(() => setSubmitting(false));
        return res;
    };

    if (sessionUser) return <Redirect to="/" />;

    function updateFile(e) {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
        }
    }

    function switchImageInput(e) {
        if (usingImageFile) {
            setImage(null)
        } else {
            setImageUrl('')
        }
        setUsingImageFile(val => !val)
    }

    const triggerSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
    }

    return (
        <div id='signup-holder'>
            <form className='signup-form' onSubmit={triggerSubmit}>
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
                    <label htmlFor='signup-image'>
                        Image
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        {usingImageFile ? <input type='file' onChange={updateFile} accept='image/*' />
                            : <input type='text' onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} placeholder={'Use an external url'} />
                        }
                        <button type='button' onClick={switchImageInput}>{usingImageFile ? 'Use an external url instead' : 'Upload a file instead'}</button>
                    </div>
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


}

export default SignupFormPage;
