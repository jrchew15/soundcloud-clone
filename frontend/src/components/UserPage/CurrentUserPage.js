import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Switch, Route, useParams } from "react-router-dom";
import UserHeader from "./UserHeader";
import { csrfFetch } from "../../store/csrf";
import SongList, { SongListActions } from "../SongList/SongList";
import './UserPage.css';

function UserPage() {
    const { username } = useParams();
    console.log('is entering UserPage', username)
    const currentUser = useSelector(state => state.session.user);
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (username === currentUser?.username) {
            console.log('is current', currentUser)
            setUser(currentUser);
            return
        }
        const getByUsername = async (username) => {
            const found = await csrfFetch(`/api/users/username/${username}`)
            console.log('queried with new route', found);
            const foundUser = await found.json();
            setUser(foundUser);
        }
        getByUsername(username)
    }, [])

    return (user && (<>
        <UserHeader user={user} />
        <nav>
            <NavLink exact to={`/users/${user.username}`}>All</NavLink>
            <NavLink to={`/users/${user.username}/tracks`}>Tracks</NavLink>
            <NavLink to={`/users/${user.username}/albums`}>Albums</NavLink>
            <NavLink to={`/users/${user.username}/playlists`}>Playlists</NavLink>
        </nav>
        <div id='user-page-content'>
            <Switch>
                <Route path={`/users/${user.username}/tracks`}>
                    <SongList />
                </Route>
            </Switch>
            <Switch>
                <Route path={`/users/${user.username}/tracks`}>
                    <SongListActions />
                </Route>
            </Switch>
        </div>
    </>)
    )
}

export default UserPage
