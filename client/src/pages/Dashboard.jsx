import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import DailyProtein from "../components/DailyProtein";
import CalorieTracker from "../components/CalorieTracker";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import NeededProtein from "../components/NeededProtein";
import Icon from "../assets/Icon.png";
import SearchBox from "../components/SearchBox";
import LogItem from "../components/LogItem";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
}

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { console.error("User not logged in"); return; }

            setUserName(user.displayName ?? user.email?.split("@")[0] ?? "there");

            try {
                const token = await user.getIdToken();
                const res = await fetch("http://localhost:3000/api/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Unauthorized or failed request");
                const data = await res.json();
                setLogs(data.logs || []);
            } catch (err) {
                console.error("Error fetching dashboard:", err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="relative text-black bg-background min-h-screen w-full flex flex-col">

            <MobileNav />
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Content + footer wrapper */}
            <div className="flex flex-col flex-1 w-full md:ml-[240px] md:w-[calc(100%-240px)]">

            {/* Main content */}
            <div className="flex flex-col flex-1 gap-8 px-4 md:px-8 py-8 pb-28 md:pb-8">

                {/* Greeting header */}
                <div className="flex flex-col gap-1 animate-fade-in">
                    <div className="flex items-center gap-2">
                        <h1 className="font-extrabold font-jakarta text-primary text-2xl md:text-3xl">
                            {getGreeting()}, <span className="text-primgreen capitalize">{userName}</span>
                        </h1>
                    </div>
                    <p className="text-secondary/60 text-sm font-jakarta">
                        Here's your nutrition overview for today.
                    </p>
                </div>

                {/* Stat cards grid */}
                <div className="grid grid-cols-1 gap-5 w-full sm:grid-cols-2 lg:grid-cols-3 items-start">
                    <DailyProtein />
                    <CalorieTracker />
                    <NeededProtein />
                </div>

                {/* Food Logging section */}
                <div className="flex flex-col gap-4">
                    {/* Section header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secgreen to-secgreen/50 flex items-center justify-center shadow-green-glow-sm">
                                <img src={Icon} alt="logo" className="w-4 h-4" />
                            </div>
                            <div>
                                <h2 className="font-jakarta font-extrabold text-primary text-xl">Food Logging</h2>
                                <p className="font-jakarta text-secondary/60 text-xs">Tracking fuel for your vitality flow</p>
                            </div>
                        </div>
                        <SearchBox />
                    </div>

                    {/* Gradient divider */}
                    <div className="h-px bg-gradient-to-r from-primgreen/30 via-secgreen/50 to-transparent" />

                    {/* Log list */}
                    <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-secbg/40">

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
                        ) : logs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-secgreen/20 flex items-center justify-center">
                                    <Leaf className="w-7 h-7 text-primgreen/50" />
                                </div>
                                <p className="font-jakarta font-semibold text-secondary/60 text-sm">No logs for today yet</p>
                                <p className="text-xs text-secondary/40">Head to Logs to add your first meal!</p>
                            </div>
                        ) : (
                            logs.map((log) => <LogItem key={log.id} log={log} />)
                        )}
                    </div>
                </div>
            </div>

            <Footer />
            </div>
        </div>
    );
}