import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Target } from "lucide-react";

export default function NeededProtein() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) return;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;

            try {
                setIsLoading(true);
                const token = await user.getIdToken();
                const res = await fetch("http://localhost:3000/api/dashboard", {
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

    const remaining = stats
        ? Math.max(stats.targetProtein - (stats.totalProtein ?? 0), 0).toFixed(1)
        : null;

    return (
        <div className="relative overflow-hidden bg-grad-green w-full min-h-[220px] flex-col shadow-card hover:shadow-green-glow hover:scale-[1.02] transition-all duration-300 rounded-2xl flex items-start justify-center p-6 gap-5 animate-slide-up-2">

            {/* Decorative radial blob */}
            <div
                className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20 animate-float-blob"
                style={{
                    background: "radial-gradient(circle, #B9F9D6 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full opacity-15 animate-float-blob-slow"
                style={{
                    background: "radial-gradient(circle, #B9F9D6 0%, transparent 70%)",
                }}
            />

            {/* Header */}
            <div className="flex items-center gap-2 z-10">
                <div className="w-8 h-8 rounded-lg bg-secgreen/20 flex items-center justify-center">
                    <Target className="w-4 h-4 text-secgreen" />
                </div>
                <p className="font-jakarta text-[10px] tracking-widest text-secgreen/70 font-bold uppercase">
                    Need Today
                </p>
            </div>

            {/* Number */}
            <div className="flex flex-col gap-1 z-10 animate-slide-up">
                <p className="font-extrabold text-secgreen font-jakarta leading-none" style={{ fontSize: "48px" }}>
                    {isLoading ? "—" : (remaining ?? "—")}
                    <span className="text-secgreen/70 text-2xl font-bold ml-1">g</span>
                </p>
            </div>

            {/* Subtext */}
            <p className="font-jakarta text-[11px] text-secgreen/60 z-10 leading-relaxed max-w-[200px]">
                Remaining to reach your{" "}
                <span className="text-secgreen font-bold">{stats?.targetProtein ?? "—"}g</span>{" "}
                peak performance goal
            </p>
        </div>
    );
}