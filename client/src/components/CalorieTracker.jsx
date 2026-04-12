import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProgressBar from "./StraightProgress";
import { Flame } from "lucide-react";

export default function CalorieTracker() {
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

    const calPct = stats
        ? Math.min((stats.totalCalories / stats.targetCalories) * 100, 100)
        : 0;

    const remaining = stats
        ? Math.max(stats.targetCalories - stats.totalCalories, 0).toFixed(0)
        : "—";

    return (
        <div className="bg-grad-card w-full min-h-[220px] flex-col shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 rounded-2xl flex items-start p-6 gap-4 border border-secgreen/20 animate-slide-up-1">

            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <p className="font-jakarta text-[10px] tracking-widest text-secondary/60 font-bold uppercase">
                    Calories
                </p>
                {/* Flame badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
                    <Flame className="w-3.5 h-3.5 text-amber-500 animate-flame" />
                    <span className="text-[10px] font-bold text-amber-600 tracking-wide">STEADY BURN</span>
                </div>
            </div>

            {/* Number */}
            <div className="flex flex-col gap-0.5 w-full">
                <div className="flex items-baseline justify-between">
                    <p className="font-extrabold text-primary font-jakarta text-[36px] leading-none animate-count-up">
                        {isLoading ? "—" : (stats?.totalCalories?.toFixed(0) ?? 0)}
                    </p>
                    <p className="text-secondary/60 font-jakarta text-sm font-semibold">
                        / {stats?.targetCalories ?? "—"} kcal
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <ProgressBar percentage={calPct} />

            {/* Remaining */}
            <div className="flex items-center justify-between w-full mt-auto">
                <p className="font-jakarta text-secondary/70 text-[11px] font-semibold">
                    {remaining} kcal remaining
                </p>
                <div className="text-[10px] font-bold text-primgreen bg-secgreen/20 px-2 py-0.5 rounded-full">
                    {Math.round(calPct)}%
                </div>
            </div>
        </div>
    );
}