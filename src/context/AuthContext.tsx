import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { apiClient } from '../lib/apiClient';
import { AuthContext, type AuthContextValue, type CurrentUser } from './authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const loadCurrentUser = async (accessToken: string) => {
        const response = await apiClient.get('/auth/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        setCurrentUser(response.data.data);
    };

    // On first load: pick up an existing session (or one Supabase just
    // created from an OAuth redirect), then keep it in sync for as long as
    // the app is open (sign in / sign out / token refresh).
    useEffect(() => {
        let isMounted = true;

        supabase.auth.getSession().then(async ({ data }) => {
            if (!isMounted) return;

            setSession(data.session);

            if (data.session) {
                try {
                    await loadCurrentUser(data.session.access_token);
                } catch {
                    setCurrentUser(null);
                }
            }

            setIsLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                setSession(newSession);

                if (newSession) {
                    try {
                        await loadCurrentUser(newSession.access_token);
                    } catch {
                        setCurrentUser(null);
                    }
                } else {
                    setCurrentUser(null);
                }
            }
        );

        return () => {
            isMounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    const refreshCurrentUser = async () => {
        if (!session) return;
        await loadCurrentUser(session.access_token);
    };

    // UC2: Sign in
    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/login`,
            },
        });
    };

    // UC1 (email/password variant)
    const signUpWithEmail = async (
        email: string,
        password: string,
        firstName?: string,
        lastName?: string
    ): Promise<{ requiresEmailConfirmation: boolean }> => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });

        if (error) {
            throw error;
        }

        // If "Confirm email" is enabled in the Supabase project, signUp
        // succeeds but returns no session yet, user must click the
        // confirmation link before they can actually sign in.
        return { requiresEmailConfirmation: !data.session };
    };

    // UC2 (email/password variant)
    const signInWithEmail = async (
        email: string,
        password: string
    ): Promise<void> => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw error;
        }
        // onAuthStateChange above picks up the resulting session automatically
    };

    // UC3: Sign out.
    const signOut = async () => {
        setIsSigningOut(true);

        try {
            if (session) {
                await apiClient.post(
                    '/auth/logout',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`,
                        },
                    }
                );
            }
        } finally {
            await supabase.auth.signOut();
            setSession(null);
            setCurrentUser(null);
            setIsSigningOut(false);
        }
    };

    const value: AuthContextValue = {
        session,
        currentUser,
        isLoading,
        isSigningOut,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        signOut,
        refreshCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
