import Icon from "../assets/Icon.png";
import SideBarButtons from "./SidebarButtons";
import { LayoutDashboard, Logs, ChartBar, X, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function SideBar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            {/* Sidebar — desktop only (mobile uses MobileNav bottom bar) */}
            <div
                className="hidden md:flex h-screen fixed flex-col glass-sidebar shadow-sidebar top-0 left-0 p-6 gap-3 z-50 w-[240px]"
            >
                {/* Logo */}
                <div className="flex justify-between items-center p-2 mb-2">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-primgreen/70 to-secgreen/30 rounded-xl flex items-center justify-center shadow-green-glow-sm">
                            <img src={Icon} alt="logo" className="w-4 h-4" />
                        </div>
                        <h1 className="font-extrabold font-jakarta text-primgreen text-xl tracking-tight">
                            VitalityFlow
                        </h1>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-primgreen/50 to-transparent mx-2" />

               

                {/* Nav buttons */}
                <div className="flex flex-col gap-1">
                    <SideBarButtons
                        onClick={() => navigate("/dashboard")}
                        isSelected={location.pathname === "/dashboard"}
                        label="Dashboard"
                        icon={<LayoutDashboard className="w-4.5 h-4.5" />}
                    />
                    <SideBarButtons
                        onClick={() => navigate("/logs")}
                        isSelected={location.pathname === "/logs"}
                        label="Logs"
                        icon={<Logs className="w-4.5 h-4.5" />}
                    />
                    <SideBarButtons
                        onClick={() => navigate("/analytics")}
                        isSelected={location.pathname === "/analytics"}
                        label="Analytics"
                        icon={<ChartBar className="w-4.5 h-4.5" />}
                    />
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-secgreen/50 to-transparent mx-2" />

                {/* User section */}
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-secgreen/20 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secgreen to-primgreen/40 flex items-center justify-center text-primgreen font-bold text-xs shadow-sm flex-shrink-0">
                        {user?.email?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-primary truncate">
                            {user?.displayName ?? user?.email?.split("@")[0] ?? "User"}
                        </p>
                        <p className="text-[10px] text-secondary/60 truncate">
                            {user?.email ?? ""}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex-shrink-0 p-1.5 rounded-lg text-secondary/50 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                        title="Sign out"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </>
    );
}