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
            <section aria-label="Sign in">
                <LoadingSpinner label="Checking your session..." />
            </section>
        );
    }

    return (
        <section aria-label="Sign in">
            <h1>Sign In</h1>

            {error && <ErrorMessage message={error} />}

            {!session && (
                <div>
                    <p>
                        Sign in with your Google account to write reviews and
                        complete a purchase.
                    </p>

                    <Button onClick={handleSignIn}>
                        Sign in with Google
                    </Button>
                </div>
            )}

            {session && (
                <div>
                    <h2>You are signed in</h2>

                    <p>
                        Signed in as: {currentUser?.email ?? session.user.email}
                    </p>

                    <p>
                        <Link to="/register">Complete your profile</Link>
                    </p>

                    <Button
                        onClick={handleSignOut}
                        isLoading={isSigningOut}
                        loadingText="Signing out..."
                    >
                        Sign Out
                    </Button>
                </div>
            )}
        </section>
    );
}
