import { onAuthStateChanged } from "firebase/auth";
import { Plus, X, Dumbbell, Flame, Leaf } from "lucide-react";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import LogAdder from "../components/LogAdder";
import LogItem from "../components/LogItem";
import Icon from "../assets/Icon.png";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

export default function Logs() {
    const [isOpen, setIsOpen] = useState(true);
    const [logs, setLogs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async (user) => {
        if (!user) return;
        const token = await user.getIdToken();
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/api/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLogs(data.logs || []);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { console.log("User not logged in yet"); return; }
            try {
                await fetchLogs(user);
            } catch (err) {
                console.error("Error fetching logs:", err);
            } finally {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const deleteLog = async (logId) => {
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        await fetch(`${API_URL}/api/logs/${logId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        await fetchLogs(user);
    };

    // Computed totals
    const totalProtein = logs.reduce((acc, l) => acc + (l.quantity / 100) * l.food.proteinPer100g, 0);
    const totalCalories = logs.reduce((acc, l) => acc + (l.quantity / 100) * l.food.caloriesPer100g, 0);

    return (
        <div className="bg-background font-jakarta min-h-screen flex flex-col">

            <MobileNav />
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex flex-col flex-1 w-full md:ml-[240px] md:w-[calc(100%-240px)]">
            <div className="flex flex-1 flex-col gap-6 px-4 md:px-8 py-8 pb-28 md:pb-8">

                {/* Page header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secgreen to-secgreen/50 flex items-center justify-center shadow-green-glow-sm">
                            <img src={Icon} alt="logo" className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-primary font-extrabold text-2xl md:text-3xl">Food Logs</h1>
                            <p className="text-secondary/60 text-xs md:text-sm">Track your daily intake</p>
                        </div>
                    </div>

                    {/* Add button */}
                    <button
                        onClick={() => setShowForm((v) => !v)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                            ${showForm
                                ? "bg-secbg/60 text-secondary hover:bg-secbg"
                                : "bg-gradient-to-r from-primgreen to-primgreen/85 text-white hover:shadow-green-glow hover:scale-[1.02]"
                            }`}
                    >
                        {showForm
                            ? <><X className="w-4 h-4" /> Cancel</>
                            : <><Plus className="w-4 h-4" /> Add Log</>
                        }
                    </button>
                </div>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-primgreen/30 via-secgreen/50 to-transparent" />

                {/* Quick stats */}
                {logs.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4 animate-slide-up">
                        <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-secbg/40">
                            <div className="w-7 h-7 rounded-lg bg-secgreen/25 flex items-center justify-center">
                                <Dumbbell className="w-3.5 h-3.5 text-primgreen" />
                            </div>
                            <div>
                                <p className="text-[9px] tracking-widest font-bold text-secondary/50 uppercase">Total Protein</p>
                                <p className="font-extrabold text-primary text-sm">{totalProtein.toFixed(1)}g</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-secbg/40">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                                <Flame className="w-3.5 h-3.5 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-[9px] tracking-widest font-bold text-secondary/50 uppercase">Total Calories</p>
                                <p className="font-extrabold text-primary text-sm">{totalCalories.toFixed(0)} kcal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-secbg/40">
                            <div className="w-7 h-7 rounded-lg bg-primgreen/10 flex items-center justify-center">
                                <span className="text-primgreen font-black text-xs">#</span>
                            </div>
                            <div>
                                <p className="text-[9px] tracking-widest font-bold text-secondary/50 uppercase">Entries</p>
                                <p className="font-extrabold text-primary text-sm">{logs.length} items</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Log adder form */}
                {showForm && <LogAdder onLogAdded={async () => { const u = auth.currentUser; if (u) { await fetchLogs(u); setShowForm(false); } }} />}

                {/* Log list */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-secbg/40 animate-slide-up">

                    {/* Desktop table header */}
                    <div className="hidden md:grid grid-cols-5 bg-gradient-to-r from-primgreen/5 to-secgreen/5 px-5 py-3.5 border-b border-secbg/40">
                        {["Food", "Quantity", "Protein", "Calories", ""].map((h, i) => (
                            <p key={i} className={`text-[10px] font-bold tracking-widest text-primgreen/70 uppercase ${i > 0 ? "text-center" : ""}`}>
                                {h}
                            </p>
                        ))}
                    </div>

                    {/* Rows */}
                    {loading ? (
                        <div className="flex flex-col gap-3 p-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-12 bg-secbg/40 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : logs.length > 0 ? (
                        logs.map((log) => <LogItem key={log.id} log={log} onDelete={deleteLog} />)
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-secgreen/20 flex items-center justify-center">
                                <Leaf className="w-7 h-7 text-primgreen/50" />
                            </div>
                            <p className="font-jakarta font-semibold text-secondary/60 text-sm">No logs for today yet</p>
                            <p className="text-xs text-secondary/40">Tap "Add Log" above to get started!</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-2 flex items-center gap-2 bg-gradient-to-r from-primgreen to-primgreen/85 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-green-glow transition-all duration-200"
                            >
                                <Plus className="w-4 h-4" />
                                Add your first log
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
            </div>
        </div>
    );
}