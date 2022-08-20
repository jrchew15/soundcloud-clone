import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, showMenu }) {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunkLogoutUser());
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
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
