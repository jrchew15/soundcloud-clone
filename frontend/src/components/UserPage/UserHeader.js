import { default_album_image } from "../../utils/default_images"

export default function UserHeader({ user }) {

    return (<div style={{ display: 'flex', boxSizing: 'border-box', padding: '30px', background: 'linear-gradient(160deg,#f50,#333)', width: '100%', height: '300px' }}>
        <img src={user.previewImage || default_album_image} alt={user.username} style={{ borderRadius: '50%', height: '100%' }} onError={(e) => { e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '3em' }}>{user.username}</span>
            <span>{user.description}</span>
        </div>
    </div>)
}
