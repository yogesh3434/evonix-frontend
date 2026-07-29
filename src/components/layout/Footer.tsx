import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 mt-auto border-t border-slate-900">
            <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col gap-4">
                    <Link to="/" className="text-2xl font-bold tracking-tight inline-block w-fit">
                        <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">EVonix</strong>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Electric vehicles for a cleaner, more efficient future.
                    </p>
                </div>

                <nav aria-label="Footer navigation" className="lg:col-span-2">
                    <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                        <li>
                            <Link to="/vehicles" className="text-sm hover:text-blue-400 transition-colors">Vehicles</Link>
                        </li>

                        <li>
                            <Link to="/hot-deals" className="text-sm hover:text-amber-400 transition-colors">Hot Deals</Link>
                        </li>

                        <li>
                            <Link to="/compare" className="text-sm hover:text-blue-400 transition-colors">Compare Vehicles</Link>
                        </li>

                        <li>
                            <Link to="/support" className="text-sm hover:text-blue-400 transition-colors">Support</Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex flex-col justify-end lg:items-end">
                    <p className="text-sm text-slate-500">
                        &copy; {currentYear} EVonix. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}