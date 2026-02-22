"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/store/useStore";
import { associateGuestDocuments } from "@/lib/storage";

export default function AuthCallback() {
    const router = useRouter();
    const { fetchUser } = useStore();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (!error && session?.user) {
                const user = session.user;
                const metadata = user.user_metadata;

                // Update profile with Google info and set state to 'logged in'
                await supabase.from('profiles').upsert({
                    id: user.id,
                    full_name: metadata.full_name || user.email?.split('@')[0],
                    avatar_url: metadata.avatar_url || metadata.picture,
                    state: 'logged in',
                    updated_at: new Date().toISOString()
                });

                await fetchUser();

                // Check if we have a pending case or guest documents
                const state = useStore.getState();
                if (state.sessionId) {
                    console.log("Associating guest documents for session:", state.sessionId);
                    try {
                        await associateGuestDocuments(state.sessionId, user.id);
                        router.push("/dashboard?new_case=success");
                    } catch (assocError) {
                        console.error("Failed to associate guest docs:", assocError);
                        router.push("/dashboard?error=association_failed");
                    }
                } else if (state.pendingCase) {
                    console.log("Found pending case, associating with user...", state.pendingCase);
                    router.push("/dashboard?new_case=success");
                } else {
                    router.push("/dashboard");
                }
            } else {
                console.error("Auth error:", error?.message || "No session found");
                router.push("/login?error=auth_failed");
            }
        };

        handleAuthCallback();
    }, [router, fetchUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#d8b23d] border-t-transparent rounded-full animate-spin" />
                <p className="text-[#000042] font-serif text-lg font-medium">Finalizing secure connection...</p>
            </div>
        </div>
    );
}
