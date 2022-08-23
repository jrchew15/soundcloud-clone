import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { actionPushToQueue } from "../../store/queue";
import { useDispatch } from "react-redux";

export default function SongDetails() {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    useEffect(() => {
        fetchSong();
        async function fetchSong() {
            let res = await csrfFetch(`/api/songs/${songId}`);

            const fetchedSong = await res.json();

            setSong(fetchedSong);
        }
    }, [])

    const addToQueue = () => {
        dispatch(actionPushToQueue(song))
    }

    return (song &&
        (
            <>
                <div style={{ display: 'flex', padding: '30px', background: '#333', width: '100%', height: '300px' }}>
                    <img src={song.previewImage || 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png'} alt={song.title} style={{ borderRadius: '50%', height: '100%' }} onError={(e) => { e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{song.title}</span>
                        <span>{song.Artist.username}</span>
                        <span>{song.Album?.title}</span>
                        <span>{song.description}</span>
                        <Link to={`/users/${song.Artist.id}/tracks`}>Back to artist's songs</Link>
                        <button onClick={addToQueue}>Add To Queue</button>
                    </div>
                </div>
            </>
        )
    )
}
