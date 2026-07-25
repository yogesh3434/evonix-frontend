import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div>
                <strong>EVonix</strong>
                <p>
                    Electric vehicles for a cleaner, more efficient future.
                </p>
            </div>

            <nav aria-label="Footer navigation">
                <ul>
                    <li>
                        <Link to="/vehicles">Vehicles</Link>
                    </li>

                    <li>
                        <Link to="/hot-deals">Hot Deals</Link>
                    </li>

                    <li>
                        <Link to="/compare">Compare Vehicles</Link>
                    </li>

                    <li>
                        <Link to="/support">Support</Link>
                    </li>
                </ul>
            </nav>

            <p>
                &copy; {currentYear} EVonix. All rights reserved.
            </p>
        </footer>
    );
}