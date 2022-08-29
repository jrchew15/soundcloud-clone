import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import SongList from "../SongList/SongList";
import { playThis, actionConcatToQueue } from "../../store/queue";
import { default_album_image } from "../../utils/default_images";
import './AlbumPage.css';


export default function AlbumPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const [album, setAlbum] = useState(null);
    const [user, setUser] = useState(null);
    const [albumSongs, setAlbumSongs] = useState([]);

    useEffect(() => {
        fetchers();

        async function fetchers() {
            const albumRes = await csrfFetch(`/api/albums/${albumId}`);
            const albumResBody = await albumRes.json();

            const userRes = await csrfFetch(`/api/users/${albumResBody.userId}`);
            const userResBody = await userRes.json();

            setAlbum(albumResBody);
            setUser(userResBody);
            setAlbumSongs(albumResBody.Songs.map(song => {
                return { ...song, Artist: { id: userResBody.id, username: userResBody.username, previewImage: userResBody.previewImage } }
            }))
        }
    }, [])

    return album && user && albumSongs.length > 0 && (
        <>
            <div id='album-detail-header' >
                <div id='album-content-container'>
                    <span id='album-header-upper-left'>
                        <i className="fa-solid fa-play" onClick={() => dispatch(playThis(albumSongs))} />
                        <div>
                            <span style={{ fontSize: '1.2em', color: 'white' }} >{album.title}</span>
                            <span style={{ fontSize: '0.9em', color: '#ccc', cursor: 'pointer' }} onClick={() => history.push(`/users/${user.id}`)} >{'By ' + user.username}</span>
                            <span style={{ fontSize: '0.9em', backgroundColor: 'rgba(0,0,0,0)', color: 'white', cursor: 'pointer' }} onClick={() => dispatch(actionConcatToQueue(albumSongs))}>...add to queue</span>
                        </div>
                    </span>
                    <div id='album-number-of-tracks'>
                        <span className='number'>{albumSongs.length}</span>
                        <span>TRACKS</span>
                    </div>
                </div>
                <img
                    src={album.previewImage || default_album_image}
                    alt={album.title}
                    id='album-image'
                    onError={(e) => { e.target.src = default_album_image }}
                />
            </div>
            <SongList listType={'album'} id={albumId} user={user} albumSongs={albumSongs} />
        </>
    )
}
