import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddSong, thunkEditSong } from '../../store/songs';
import { checkAudio, checkImage } from '../../utils/functions';
import '../Form.css';

function SongForm({ contentRef }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);

    const frontendValidations = () => {
        let errsArr = [];
        if (title.length < 1) {
            errsArr.push('Title is required');
        }
        if (url.length < 1 || !checkAudio(url)) {
            errsArr.push('A valid audio file url is required');
        }
        if (imageUrl && !checkImage(imageUrl)) {
            errsArr.push('The image you provided is invalid');
        }
        setErrors(errsArr)

        if (errsArr.length) setShowErrors(true);

        return errsArr
    }

    useEffect(() => {
        contentRef.current.classList.add('song-form');
        if (songId && songs[songId]) {
            let song = songs[songId];
            setTitle(song.title);
            setDescription(song.description);
            setUrl(song.url);
            setImageUrl(song.previewImage);
        }

        return () => {
            contentRef.current.classList.remove('song-form');
        }
    }, [])

    useEffect(() => {
        if (showErrors) frontendValidations()
    }, [title, imageUrl, url])

    let { songId } = useParams();
    if (songId && !songs[songId]) {
        return <h2>You do not have permission to edit songs you did not upload.</h2>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let errorsArr = frontendValidations();

        if (errorsArr.length) {
            return
        }

        if (songId) {
            const res = await dispatch(thunkEditSong({ id: songId, title, description, url, imageUrl }))
                .then(() => history.push(`/songs/${songId}`))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.message) setErrors([data.message]);
                    if (data && data.errors) setErrors(errors)
                    return res
                });
        } else {
            const res = await dispatch(thunkAddSong({ title, description, url, imageUrl }))
                .then((body) => history.push(`/songs/${body.id}`))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.message) setErrors([data.message]);
                    if (data && data.errors) setErrors(errors)
                    return res
                });
        }
    }

    const cancelUpload = () => {
        history.push(`/users/${user.id}`)
    }

    return (
        <>
            <form className='song-form' onSubmit={handleSubmit}>
                <h4>Upload a Song</h4>
                {(errors.length > 0 && (<ul className='errors' style={{ gridRow: '1', gridColumn: '1/3' }}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>))}
                <div className='inputs-container'>

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
                    <div className='buttons-holder'>
                        <button type="submit" className='submit-button'>Submit</button>
                        <button type='button' onClick={cancelUpload} className='cancel-button'>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SongForm;
