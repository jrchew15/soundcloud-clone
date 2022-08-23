import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';

export default function MyMusicPlayer() {
    const { index, queue } = useSelector(state => state.queue);
    const songUrl = queue[index]?.url;

    return <ReactAudioPlayer src={songUrl} controls />
}
