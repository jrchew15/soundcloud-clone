import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { csrfFetch } from "../../store/csrf";
import { playThis, actionConcatToQueue } from "../../store/queue";
import { parsedDate } from "../../utils/functions";
import { default_album_image } from "../../utils/default_images";
import './AlbumItem.css';


export default function AlbumItem({ albumId }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [album, setAlbum] = useState(null);
    const [albumSongs, setAlbumSongs] = useState([]);

    useEffect(() => {
        fetches();

        async function fetches() {
            const res = await csrfFetch(`/api/albums/${albumId}`);
            const resAlbum = await res.json();

            setAlbum(resAlbum);
            setAlbumSongs(resAlbum.Songs.map(song => ({ ...song, Artist: resAlbum.Artist })));
            setUser(resAlbum.Artist);
        }
    }, [])

    return user && album && albumSongs.length > 0 && (
        <>
            <Link to={`/albums/${album.id}`}>
                <img className='album-item-image' src={album.previewImage || default_album_image} alt={album.title} onError={(e) => { e.target.src = default_album_image }} />
            </Link>
            <div className='album-list-details'>
                <span style={{ gridArea: 'artist' }}>{user && user.username}</span>
                <span style={{ gridArea: 'title' }}>{album.title}</span>
                <i
                    style={{ gridArea: 'button' }}
                    className="fa-solid fa-play"
                    onClick={() => dispatch(playThis(albumSongs))}
                />
                <span style={{ gridArea: 'date' }}>{'Uploaded ' + parsedDate(album.createdAt)}</span>
                <span
                    style={{ gridArea: 'genre' }}
                    className='queue-button'
                    onClick={() => dispatch(actionConcatToQueue(albumSongs))}
                >
                    Add to Queue
                    <i className="fa-solid fa-angle-double-right" />
                </span>
            </div>
        </>
    )
}
