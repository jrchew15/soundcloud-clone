import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";

export default function SongDetails() {
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    useEffect(() => {
        fetchSong();
        async function fetchSong() {
            let res
            try {
                res = await csrfFetch(`/api/songs/${songId}`);
            } catch (err) {
                err.json().then(val => console.log(val))
            }
            const fetchedSong = await res.json();

            setSong(fetchedSong);
        }
    }, [])


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
                    </div>
                </div>
            </>
        )
    )
}
