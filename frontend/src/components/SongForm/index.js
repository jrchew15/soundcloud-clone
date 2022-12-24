import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddSong, thunkEditSong } from '../../store/songs';
import { checkAudio, checkImage } from '../../utils/functions';
import { allowed_image_extensions } from '../../utils/default_images';
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

    const [usingSongFile, setUsingSongFile] = useState(true);
    const [usingImageFile, setUsingImageFile] = useState(true);

    const [imageFile, setImageFile] = useState(null);
    const [songFile, setSongFile] = useState(null);

    const inspectRef = useRef(null)

    const frontendValidations = () => {
        let allowedAudioExtentions = ['ogg', 'mp3', 'wav']
        let errsArr = [];
        if (title.length < 1) {
            errsArr.push('Title is required');
        }
        if (!url && !songFile) {
            errsArr.push('You must include an audio file or a url for an external file')
        }
        if (url && !checkAudio(url)) {
            errsArr.push('A valid audio file url is required');
        }
        if (songFile) {
            if (songFile.type.split('/')[0] !== 'audio' || !allowedAudioExtentions.includes(songFile.name.split('.')[1])) {
                errsArr.push('Song file must be a ' + allowedAudioExtentions.join(', '))
            }
            if (songFile.size > 1e7) {
                errsArr.push('Uploaded audio file must be less than 10MB in size')
            }
        }
        if (imageUrl && !checkImage(imageUrl)) {
            errsArr.push('The image you provided is invalid');
        }
        if (imageFile) {

            if (imageFile.type.split('/')[0] !== 'image') {
                errsArr.push('Uploaded file must be an image')
            }

            if (!allowed_image_extensions.includes(imageFile.type.split('/')[1])) {
                errsArr.push('Image must be a ' + allowed_image_extensions.join(', '))
            }

            if (imageFile.size > 1e6) {
                errsArr.push('Image file must be less than 1MB in size')
            }
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
        console.log(songFile)
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
            const res = await dispatch(thunkAddSong({ title, description, song: songFile, image: imageFile }))
                .then((body) => history.push(`/songs/${body.id}`))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data && data.message) setErrors([data.message]);
                    if (data && data.errors) setErrors(errors)
                    return res
                });
        }
    }

    const cancelUpload = () => {
        history.push(`/users/${user.id}`)
    }

    const switchSongInput = (e) => {
        if (usingSongFile) {
            setSongFile(null)
        } else {
            setUrl('')
        }
        setUsingSongFile(val => !val)
    }

    const switchImageInput = (e) => {
        if (usingImageFile) {
            setImageFile(null)
        } else {
            setImageUrl('')
        }
        setUsingImageFile(val => !val)
    }

    return (
        <>
            <form className='song-form' onSubmit={handleSubmit}>
                <h4>Upload a Song <button type='button' onClick={(e) => console.log(inspectRef.current)}>Console</button></h4>
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
                    <label>
                        Audio file
                    </label>
                    <div>
                        {usingSongFile ? <input
                            id='song'
                            type="file"
                            onChange={(e) => setSongFile(e.target.files[0])}
                            required
                            accept='audio'
                        /> : <input
                            id='song-url'
                            type="text"
                            value={url}
                            placeholder='Use an external url'
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />}
                        <button type='button' onClick={switchSongInput} >{usingSongFile ? 'Use an external url' : 'Upload a file'}</button>
                    </div>
                    <label>
                        Song Image
                    </label>
                    <div>
                        {usingImageFile ? <input
                            id='image'
                            type="file"
                            accept='image/*'
                            onChange={(e) => setImageFile(e.target.files[0])}
                            ref={inspectRef}
                        /> : <input
                            id='song-imageUrl'
                            type="text"
                            value={imageUrl}
                            placeholder='Use an external url'
                            onChange={(e) => setImageUrl(e.target.value)}
                        />}
                        <button type='button' onClick={switchImageInput}>{usingImageFile ? 'Use an external url' : 'Upload a file'}</button>
                    </div>
                    <div className='buttons-holder' style={{ gridColumn: '1 / 3' }}>
                        <button type="submit" className='submit-button'>Submit</button>
                        <button type='button' onClick={cancelUpload} className='cancel-button'>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SongForm;
