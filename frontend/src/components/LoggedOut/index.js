import { Link } from "react-router-dom"
export default function OfferSignup() {
    return (
        <>
            <h2>You must be logged in to access the full website.</h2>
            <Link to='/signup' >
                <div>Sign Up</div>
            </Link >
            <Link to='/login' >
                <div>Log In</div>
            </Link >
        </>
    )
}
