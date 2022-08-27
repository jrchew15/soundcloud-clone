import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import UserHeader from "./UserHeader";
import SongList, { SongListActions } from "../SongList/SongList";
import { csrfFetch } from "../../store/csrf";
import AlbumItem from "../AlbumPage/AlbumItem";
import './UserPage.css';

function CurrentUserPage() {
    const user = useSelector(state => state.session.user);
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        fetchAlbums();

        async function fetchAlbums() {
            const res = await csrfFetch(`/api/users/${user.id}/albums`);
            const { Albums } = await res.json();
            setAlbums(Albums.map(ele => ele.id))
        }
    }, []);

    return (user && (<>
        <UserHeader user={user} />
        <nav id="user-tabs">
            <NavLink exact to={`/users/${user.id}`}>All</NavLink>
            <NavLink to={`/users/${user.id}/tracks`}>Tracks</NavLink>
            <NavLink to={`/users/${user.id}/albums`}>Albums</NavLink>
        </nav>
        <div id='user-page-content'>
            <Switch>
                <Route exact path={`/users/${user.id}`}>
                    <SongList listType='currentUser' user={user} />
                </Route>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongList listType='currentUser' user={user} />
                </Route>
                <Route path={`/users/${user.id}/albums`}>
                    <ul style={{ display: 'flex', flexDirection: 'column' }}>
                        {albums.map(albumId => (
                            <li key={albumId} style={{ display: 'flex' }}>
                                <AlbumItem albumId={albumId} />
                            </li>
                        ))}
                    </ul>
                </Route>
            </Switch>
            {/* <Switch>
                <Route exact path={`/users/${user.id}`}>
                    <SongListActions isCurrentUser={true} />
                </Route>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongListActions isCurrentUser={true} />
                </Route>
            </Switch> */}
        </div>
    </>)
    )
}

export default CurrentUserPage
