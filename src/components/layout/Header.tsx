import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/useAuth';

export default function Header() {
  const { session, currentUser, isSigningOut, signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setError(null);

    try {
      await signOut();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong signing out.'
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-white shadow-md">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:h-20 md:flex-row md:gap-0 md:py-0">
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            <strong className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              EVonix
            </strong>
          </Link>
        </div>

        <nav
          aria-label="Primary navigation"
          className="hide-scrollbar w-full overflow-x-auto md:w-auto"
        >
          <ul className="flex min-w-max items-center justify-start gap-6 px-2 pb-2 md:justify-end md:px-0 md:pb-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-blue-400 ${
                    isActive ? 'text-blue-400' : 'text-slate-300'
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/vehicles"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-blue-400 ${
                    isActive ? 'text-blue-400' : 'text-slate-300'
                  }`
                }
              >
                Vehicles
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/hot-deals"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-amber-400 ${
                    isActive ? 'text-amber-400' : 'text-slate-300'
                  }`
                }
              >
                Hot Deals
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-blue-400 ${
                    isActive ? 'text-blue-400' : 'text-slate-300'
                  }`
                }
              >
                Cart
              </NavLink>
            </li>

            <li>
                <NavLink
                    to="/support"
                    className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-blue-400 ${
                        isActive ? 'text-blue-400' : 'text-slate-300'
                    }`
                    }
                >
                    Support
                </NavLink>
            </li>

            <li>
              {session ? (
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-slate-400 lg:inline">
                    {currentUser?.email ?? session.user.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="text-sm font-medium text-slate-300 transition-colors hover:text-blue-400 disabled:opacity-50"
                  >
                    {isSigningOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-blue-400 ${
                      isActive ? 'text-blue-400' : 'text-slate-300'
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </li>

            {session && (
              <li>
                <NavLink
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Complete Profile
                </NavLink>
              </li>
            )}

            {error && (
              <li className="text-xs text-red-400" role="alert">
                {error}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
