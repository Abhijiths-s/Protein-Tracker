import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import SideBar from "../components/SideBar";
import { TrendingUp, Dumbbell, Flame, Calendar, ChevronDown } from "lucide-react";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

// ── Analytics sub-components ──────────────────────────────
import AnalyticsStatCard from "../components/analytics/AnalyticsStatCard";
import ProteinChart from "../components/analytics/ProteinChart";
import CalorieChart from "../components/analytics/CalorieChart";
import CombinedChart from "../components/analytics/CombinedChart";

export default function Analytics() {
    const [isOpen, setIsOpen] = useState(true);
    const [data, setData] = useState([]);
    const [targets, setTargets] = useState({ protein: 0, calories: 0 });
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(7);
    const [activeChart, setActiveChart] = useState("both"); // "protein" | "calories" | "both"

    // Fetch analytics data whenever day range changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;
            setLoading(true);
            try {
                const token = await user.getIdToken();
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
                const res = await fetch(`${API_URL}/api/analytics?days=${days}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch analytics");
                const json = await res.json();
                setData(json.data ?? []);
                setTargets({ protein: json.targetProtein ?? 0, calories: json.targetCalories ?? 0 });
            } catch (err) {
                console.error("Analytics fetch error:", err);
            } finally {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [days]);

    // Format raw dates to "Mon 11" labels for chart X-axis
    const chartData = data.map((d) => ({
        ...d,
        label: new Date(d.date).toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
    }));

    // Summary statistics
    const avgProtein   = data.length ? data.reduce((s, d) => s + d.protein, 0) / data.length : 0;
    const avgCalories  = data.length ? data.reduce((s, d) => s + d.calories, 0) / data.length : 0;
    const peakProtein  = Math.max(...data.map((d) => d.protein), 0);
    const peakCalories = Math.max(...data.map((d) => d.calories), 0);

    const showProtein  = activeChart === "protein" || activeChart === "both";
    const showCalories = activeChart === "calories" || activeChart === "both";

    return (
        <div className="bg-background font-jakarta min-h-screen flex flex-col">

            <MobileNav />
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Page content + footer wrapper */}
            <div className="flex flex-col flex-1 w-full md:ml-[240px] md:w-[calc(100%-240px)]">

            {/* Page content */}
            <div className="flex flex-1 flex-col gap-7 px-4 md:px-8 py-8 pb-28 md:pb-8">

                {/* ── Page header + controls ─────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">

                    {/* Title */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secgreen to-secgreen/50 flex items-center justify-center shadow-green-glow-sm">
                            <TrendingUp className="w-4 h-4 text-primgreen" />
                        </div>
                        <div>
                            <h1 className="text-primary font-extrabold text-2xl md:text-3xl">Analytics</h1>
                            <p className="text-secondary/60 text-xs md:text-sm">Your nutrition trends over time</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 flex-wrap">

                        {/* Day range dropdown */}
                        <div className="relative">
                            <select
                                value={days}
                                onChange={(e) => setDays(Number(e.target.value))}
                                className="appearance-none bg-white border border-secbg/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary pr-8 focus:outline-none focus:border-primgreen focus:ring-2 focus:ring-primgreen/20 cursor-pointer shadow-sm"
                            >
                                <option value={7}>Last 7 days</option>
                                <option value={14}>Last 14 days</option>
                                <option value={30}>Last 30 days</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/50 pointer-events-none" />
                        </div>

                        {/* Chart filter toggle */}
                        <div className="flex rounded-xl bg-white border border-secbg/80 p-1 shadow-sm gap-1">
                            {[
                                { key: "both",     label: "Both" },
                                { key: "protein",  label: "Protein" },
                                { key: "calories", label: "Calories" },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveChart(key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                                        activeChart === key
                                            ? "bg-primgreen text-white shadow-sm"
                                            : "text-secondary hover:text-primgreen"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-primgreen/30 via-secgreen/50 to-transparent -mt-3" />

                {/* ── Summary stat cards ─────────────────────────── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnalyticsStatCard
                        label="Avg Protein"
                        value={avgProtein.toFixed(1)}
                        unit="g / day"
                        icon={<Dumbbell className="w-5 h-5 text-primgreen" />}
                        color="text-primgreen"
                        bgColor="bg-secgreen/25"
                        delay="0.05s"
                    />
                    <AnalyticsStatCard
                        label="Avg Calories"
                        value={avgCalories.toFixed(0)}
                        unit="kcal / day"
                        icon={<Flame className="w-5 h-5 text-amber-500" />}
                        color="text-amber-500"
                        bgColor="bg-amber-50"
                        delay="0.1s"
                    />
                    <AnalyticsStatCard
                        label="Peak Protein"
                        value={peakProtein.toFixed(1)}
                        unit="g"
                        icon={<TrendingUp className="w-5 h-5 text-primgreen" />}
                        color="text-primgreen"
                        bgColor="bg-secgreen/20"
                        delay="0.15s"
                    />
                    <AnalyticsStatCard
                        label="Peak Calories"
                        value={peakCalories.toFixed(0)}
                        unit="kcal"
                        icon={<Calendar className="w-5 h-5 text-amber-500" />}
                        color="text-amber-500"
                        bgColor="bg-amber-50"
                        delay="0.2s"
                    />
                </div>

                {/* ── Charts ────────────────────────────────────────── */}
                {showProtein  && <ProteinChart  data={chartData} targetProtein={targets.protein}   loading={loading} />}
                {showCalories && <CalorieChart  data={chartData} targetCalories={targets.calories} loading={loading} />}
                {activeChart === "both" && <CombinedChart data={chartData} loading={loading} />}

            </div>

            <Footer />
            </div>
        </div>
    );
}
