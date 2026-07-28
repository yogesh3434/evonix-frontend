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
    signOut: () => Promise<void>;
    refreshCurrentUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);
