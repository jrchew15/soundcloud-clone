export default function UserHeader({ user }) {
    console.log(user)
    return (<div style={{ display: 'flex', padding: '30px', background: '#333', width: '100%', height: '300px' }}>
        <img src={user.previewImage || 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png'} alt={user.username} style={{ borderRadius: '50%', height: '100%' }} onError={(e) => { e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{user.username}</span>
            <span>{user.description}</span>
        </div>
    </div>)
}
