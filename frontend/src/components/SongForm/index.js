import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddSong, thunkEditSong } from '../../store/songs';
import '../Form.css';

function SongForm({ songId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (songId) {
            const res = await dispatch(thunkEditSong({ id: songId, title, description, url, imageUrl, albumId: albumId || null }))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data && data.message) setErrors([data.message]);
                    else if (data && data.errors) setErrors(errors)
                });
            if (res.ok) history.push(`/songs/${songId}`)
        } else {
            const res = await dispatch(thunkAddSong({ title, description, url, imageUrl, albumId: albumId || null }))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data && data.message) setErrors([data.message]);
                    else if (data && data.errors) setErrors(errors)
                });
            console.log(res)
            if (res.ok) history.push(`/users/${user.username}/tracks`)
        }
    }

    return (
        <form className='song-form' onSubmit={handleSubmit}>
            {(errors.length > 0 && (<ul className='errors' style={{ gridRow: '1', gridColumn: '1/3' }}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>))}
            <label htmlFor='song-title'>
                Title
            </label>
            <input
                id='song-title'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label htmlFor='song-description'>
                Description
            </label>
            <input
                id='song-description'
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value || '')}
            />
            <label htmlFor='song-url'>
                Audo file URL
            </label>
            <input
                id='song-url'
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <label htmlFor='song-imageUrl'>
                Song Image
            </label>
            <input
                id='song-imageUrl'
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <label htmlFor='song-album'>
                Album
            </label>
            <input
                id='song-album'
                type="text"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
            // In the future, can add select out of current albums
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default SongForm;
