import { Link } from "react-router-dom"

const Nav = () => {
    return <nav>
        <a href="/">Home</a>
        <a href="/profile/ryan123">Profile</a>
        {/* <Link to="/">Home</Link>
        <Link to="/profile/ryan123">Profile</Link> */}
    </nav>
}

export default Nav