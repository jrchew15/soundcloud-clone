export default function UserHeader(user) {
    <div style={{ display: 'flex', padding: '30px', background: '#333' }}>
        <img src={user.previewImage} alt={user.username} style={{ borderRadius: '50%', height: '100%' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{user.username}</span>
            <span>{user.description}</span>
        </div>
    </div>
}
