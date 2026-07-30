import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function Header() {
  const { session, currentUser, isSigningOut, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Sign out failed:', err);
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

            {session ? (
              <>
                <li className="hidden text-sm font-medium text-slate-300 md:block">
                  {currentUser?.email ?? session.user.email}
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSigningOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
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
                </li>

                <li>
                  <NavLink
                    to="/register"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
