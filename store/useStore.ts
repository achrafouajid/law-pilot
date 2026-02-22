import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'client' | 'lawyer' | 'admin';
  full_name?: string;
  avatar_url?: string;
  state?: string;
}

interface Case {
  id: string;
  title: string;
  type: string;
  status: 'active' | 'pending' | 'closed' | 'in_review';
  progress: number;
  client_id: string;
  created_at: string;
}

interface PendingCase {
  serviceId: string;
  caseType: string;
  files: { id: string; name: string; uploaded: boolean }[];
}

interface AppState {
  user: User | null;
  cases: Case[];
  pendingCase: PendingCase | null;
  sessionId: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setCases: (cases: Case[]) => void;
  setPendingCase: (pending: PendingCase | null) => void;
  fetchUser: () => Promise<void>;
  signOut: () => Promise<void>;
  setSessionId: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  cases: [],
  pendingCase: null,
  sessionId: null,
  loading: true,
  setUser: (user) => set({ user }),
  setCases: (cases) => set({ cases }),
  setPendingCase: (pendingCase) => set({ pendingCase }),
  fetchUser: async () => {
    set({ loading: true });
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      // Get profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      set({
        user: {
          id: session.user.id,
          email: session.user.email!,
          role: profile?.role || 'client',
          full_name: profile?.full_name,
          avatar_url: profile?.avatar_url,
          state: profile?.state,
        },
      });
    } else {
      set({ user: null });
    }
    set({ loading: false });
  },
  setSessionId: (id: string) => set({ sessionId: id }),
  signOut: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ state: 'logged out' })
        .eq('id', user.id);
    }
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
