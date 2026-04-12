import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CircularProgress from "./CircularProgress";
import { Zap, CheckCircle2 } from "lucide-react";

export default function DailyProtein() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) return;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;

            try {
                setIsLoading(true);
                const token = await user.getIdToken();
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
                const res = await fetch(`${API_URL}/api/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Unauthorized or failed request");
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Error fetching dashboard:", err);
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const pct = stats?.percentage ?? 0;
    const isOnTrack = pct > 50;

    return (
        <div className="card-accent-top bg-white w-full min-h-[220px] flex-col shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 rounded-2xl flex items-center justify-between p-6 gap-5 animate-slide-up">

            {/* Header row */}
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col gap-1">
                    <p className="font-jakarta text-[10px] tracking-widest text-secondary/60 font-bold uppercase">
                        Daily Protein
                    </p>
                    <p className="font-bold text-secondary font-jakarta text-xl leading-none">
                        <span className="font-extrabold text-primary font-jakarta text-[28px]">
                            {isLoading ? "—" : (stats?.totalProtein?.toFixed(1) ?? 0)}g
                        </span>
                        <span className="text-sm text-secondary/60 ml-1">
                            / {stats?.targetProtein ?? "—"}g
                        </span>
                    </p>
                </div>

                {/* Icon badge */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secgreen to-secgreen/50 flex items-center justify-center shadow-green-glow-sm">
                    <CheckCircle2 className="w-5 h-5 text-primgreen" />
                </div>
            </div>

            {/* Circular progress */}
            <CircularProgress percentage={pct} />

            {/* Status badge */}
            {isOnTrack ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secgreen/30 text-primgreen font-jakarta text-xs font-semibold animate-fade-in">
                    <Zap className="w-3.5 h-3.5 fill-primgreen" />
                    Great progress! Keep it up.
                </div>
            ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-500 font-jakarta text-xs font-semibold animate-fade-in border border-red-100">
                    <Zap className="w-3.5 h-3.5" />
                    Come on! A lot more to go.
                </div>
            )}
        </div>
    );
}