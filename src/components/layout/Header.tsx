import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-slate-950 text-white shadow-md border-b border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between py-4 md:py-0 md:h-20 gap-4 md:gap-0">
                <div className="flex-shrink-0">
                    <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                        <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">EVonix</strong>
                    </Link>
                </div>

                <nav aria-label="Primary navigation" className="w-full md:w-auto overflow-x-auto hide-scrollbar">
                    <ul className="flex items-center justify-start md:justify-end gap-6 min-w-max pb-2 md:pb-0 px-2 md:px-0">
                        <li>
                            <NavLink to="/" className={({isActive}) => `text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-slate-300'}`}>Home</NavLink>
                        </li>

                        <li>
                            <NavLink to="/vehicles" className={({isActive}) => `text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-slate-300'}`}>Vehicles</NavLink>
                        </li>

                        <li>
                            <NavLink to="/hot-deals" className={({isActive}) => `text-sm font-medium transition-colors hover:text-amber-400 ${isActive ? 'text-amber-400' : 'text-slate-300'}`}>Hot Deals</NavLink>
                        </li>

                        <li>
                            <NavLink to="/compare" className={({isActive}) => `text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-slate-300'}`}>Compare</NavLink>
                        </li>

                        <li>
                            <NavLink to="/login" className={({isActive}) => `text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-slate-300'}`}>Login</NavLink>
                        </li>

                        <li>
                            <NavLink to="/register" className="text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Register</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}