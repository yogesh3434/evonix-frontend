import { createContext } from 'react';
import type { Session } from '@supabase/supabase-js';

export interface CurrentUser {
    id: string;
    email: string | undefined;
    profile: Record<string, unknown> | null;
}

export interface AuthContextValue {
    session: Session | null;
    currentUser: CurrentUser | null;
    isLoading: boolean;
    isSigningOut: boolean;
    signInWithGoogle: () => Promise<void>;
    signUpWithEmail: (
        email: string,
        password: string,
        firstName?: string,
        lastName?: string
    ) => Promise<{ requiresEmailConfirmation: boolean }>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshCurrentUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);
