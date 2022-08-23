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
            <ProfileImage user={user} />
            <span id='drop-down-button'>
                {user.username}
            </span>
            <i className="fa-solid fa-angle-down" id="drop-down-arrow" style={{ fontSize: '1em' }} />
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <Link to={`/users/${user.id}`}>
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

    function ProfileImage({ user }) {
        return user.previewImage ? (
            <img id='profile-image' src={user.previewImage} alt={user.username} onError={(e) => e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png'} />
        ) : <i id='profile-image' className="fa-solid fa-user" />
    }
}

export default ProfileButton;
