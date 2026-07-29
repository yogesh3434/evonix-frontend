import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function LoginPage() {
    const {
        session,
        currentUser,
        isLoading,
        isSigningOut,
        signInWithGoogle,
        signOut,
    } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async () => {
        setError(null);

        try {
            await signInWithGoogle();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong signing in.'
            );
        }
    };

    const handleSignOut = async () => {
        setError(null);

        try {
            await signOut();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong signing out.'
            );
        }
    };

    if (isLoading) {
        return (
            <section aria-label="Sign in" className="container mx-auto px-4 py-16 flex items-center justify-center flex-grow">
                <LoadingSpinner label="Checking your session..." />
            </section>
        );
    }

    return (
        <section aria-label="Sign in" className="container mx-auto px-4 py-16 flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-slate-900 text-center">Sign In</h1>

                {error && <ErrorMessage message={error} />}

                {!session && (
                    <div className="flex flex-col gap-6">
                        <p className="text-sm text-slate-600 text-center leading-relaxed">
                            Sign in with your Google account to write reviews and
                            complete a purchase.
                        </p>

                        <Button onClick={handleSignIn} fullWidth size="lg">
                            Sign in with Google
                        </Button>
                    </div>
                )}

                {session && (
                    <div className="flex flex-col gap-4 text-center">
                        <h2 className="text-lg font-semibold text-slate-900">You are signed in</h2>

                        <p className="text-sm text-slate-600">
                            Signed in as: <strong className="font-medium text-slate-900">{currentUser?.email ?? session.user.email}</strong>
                        </p>

                        <p className="py-2">
                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                Complete your profile
                            </Link>
                        </p>

                        <Button
                            onClick={handleSignOut}
                            isLoading={isSigningOut}
                            loadingText="Signing out..."
                            variant="secondary"
                            fullWidth
                        >
                            Sign Out
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
