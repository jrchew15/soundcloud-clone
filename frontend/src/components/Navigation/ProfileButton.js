import { Link } from "react-router-dom"

export default function ProfileButton({ user }) {
    // TODO: add link funcitonality
    return (
        <button >
            <i className='fa-solid fa-user'></i>
            {user.username}
        </button>
    )
}
