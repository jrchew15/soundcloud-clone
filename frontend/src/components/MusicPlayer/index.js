import ReactAudioPlayer from 'react-audio-player';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionProgressQueue } from '../../store/queue';

export default function MyMusicPlayer() {
    const dispatch = useDispatch();
    const { currentIndex, queue } = useSelector(state => state.queue);
    const [songUrl, setSongUrl] = useState('');

    useEffect(() => {
        if (queue.length) {
            setSongUrl(queue[currentIndex].url);
        }
    }, [currentIndex])

    const onEnd = () => {
        setSongUrl('');
        dispatch(actionProgressQueue())
    }

    return (
        <div id='audio-container'>
            <ReactAudioPlayer autoPlay={true} src={songUrl} controls onEnded={onEnd} />
            <div id='display-queue'>
                <i className='fa-solid fa-bars' style={{ position: 'relative', fontSize: '2em' }}>
                    <i className='fa-solid fa-play' style={{ position: 'absolute', left: -8, top: 3, fontSize: '0.5em' }} />
                </i>
            </div>
            <ul id='queue-list'>
                {queue.slice(currentIndex).map((song) => (
                    <li key={song.id}>
                        <img src={song.imageUrl} alt='thumbnail' />
                        <span>
                            <span>
                                {song.title}
                            </span>
                            <span>
                                {song.description}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
