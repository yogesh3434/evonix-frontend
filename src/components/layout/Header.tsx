import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div>
                <Link to="/">
                    <strong>EVonix</strong>
                </Link>
            </div>

            <nav aria-label="Primary navigation">
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/vehicles">Vehicles</NavLink>
                    </li>

                    <li>
                        <NavLink to="/hot-deals">Hot Deals</NavLink>
                    </li>

                    <li>
                        <NavLink to="/compare">Compare</NavLink>
                    </li>

                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>

                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}