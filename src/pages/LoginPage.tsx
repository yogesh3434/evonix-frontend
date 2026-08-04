import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

type EmailMode = 'signin' | 'signup';

export default function LoginPage() {
    const {
        session,
        currentUser,
        isLoading,
        isSigningOut,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        signOut,
    } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [emailMode, setEmailMode] = useState<EmailMode>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // a profile counts as "complete" once the user has provided a phone
    // number or a saved address (same rule RegisterPage uses to validate
    // the form)
    // once true, the "Complete your profile" prompt hides itself
    const profile = currentUser?.profile;
    const isProfileComplete = Boolean(
        profile && (profile.phone || profile.hasAddress)
    );

    const handleGoogleSignIn = async () => {
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

    const handleEmailSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setStatusMessage(null);
        setIsSubmitting(true);

        try {
            if (emailMode === 'signup') {
                const { requiresEmailConfirmation } = await signUpWithEmail(
                    email,
                    password,
                    firstName || undefined,
                    lastName || undefined
                );

                if (requiresEmailConfirmation) {
                    setStatusMessage(
                        'Account created. Check your email for a confirmation link before signing in.'
                    );
                } else {
                    setStatusMessage('Account created and signed in.');
                }
            } else {
                await signInWithEmail(email, password);
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
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
                {statusMessage && (
                    <p role="status" className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-center">
                        {statusMessage}
                    </p>
                )}

                {!session && (
                    <div className="flex flex-col gap-6">
                        <Button onClick={handleGoogleSignIn} fullWidth size="lg">
                            Sign in with Google
                        </Button>

                        <div className="flex items-center gap-3">
                            <span className="h-px flex-1 bg-slate-200" />
                            <span className="text-xs uppercase tracking-wide text-slate-400">or</span>
                            <span className="h-px flex-1 bg-slate-200" />
                        </div>

                        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4" noValidate>
                            {emailMode === 'signup' && (
                                <div className="flex gap-3">
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        placeholder="Enter first name"
                                        autoComplete="given-name"
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                    />
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Enter last name"
                                        autoComplete="family-name"
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                    />
                                </div>
                            )}

                            <Input
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Enter email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <Input
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Enter password"
                                autoComplete={emailMode === 'signup' ? 'new-password' : 'current-password'}
                                required
                                minLength={6}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="secondary"
                                isLoading={isSubmitting}
                                loadingText={
                                    emailMode === 'signup'
                                        ? 'Creating account...'
                                        : 'Signing in...'
                                }
                            >
                                {emailMode === 'signup'
                                    ? 'Create Account'
                                    : 'Sign In with Email'}
                            </Button>
                        </form>

                        <p className="text-sm text-slate-600 text-center">
                            {emailMode === 'signup' ? (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEmailMode('signin');
                                            setError(null);
                                            setStatusMessage(null);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                    >
                                        Sign in
                                    </button>
                                </>
                            ) : (
                                <>
                                    Need an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEmailMode('signup');
                                            setError(null);
                                            setStatusMessage(null);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                    >
                                        Create one
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                )}

                {session && (
                    <div className="flex flex-col gap-4 text-center">
                        <h2 className="text-lg font-semibold text-slate-900">You are signed in</h2>

                        <p className="text-sm text-slate-600">
                            Signed in as: <strong className="font-medium text-slate-900">{currentUser?.email ?? session.user.email}</strong>
                        </p>

                        {!isProfileComplete && (
                            <p className="py-2">
                                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    Complete your profile
                                </Link>
                            </p>
                        )}

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
