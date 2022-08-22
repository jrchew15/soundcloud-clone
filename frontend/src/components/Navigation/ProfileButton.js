import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, showMenu }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunkLogoutUser());
        history.push('/');
    };

    return (
        <>
            <i className="fa-solid fa-user" />
            <span id='drop-down-button'>
                {user.username}
            </span>
            <i className="fa-solid fa-angle-down" id="drop-down-arrow" style={{ fontSize: '1em' }} />
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <Link to={`/users/${user.username}`}>
                            <i className='fa-solid fa-user' />{user.username}
                        </Link>
                    </li>
                    <li><i className='fa-solid fa-envelope' />{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
