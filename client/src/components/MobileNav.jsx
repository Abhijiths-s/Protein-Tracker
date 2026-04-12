import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, NotebookText, TrendingUp } from "lucide-react";

const NAV_ITEMS = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/logs",      label: "Logs",      icon: NotebookText    },
    { path: "/analytics", label: "Analytics", icon: TrendingUp      },
];

export default function MobileNav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        /* Only visible on mobile (md:hidden) */
        <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 font-jakarta">
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-secbg/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl px-2 py-2">
                {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
                    const isActive = location.pathname === path;
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            className={`relative flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-250 select-none
                                ${isActive
                                    ? "bg-gradient-to-br from-primgreen to-primgreen/80 text-white shadow-green-glow-sm"
                                    : "text-secondary/50 hover:text-primgreen hover:bg-secgreen/20"
                                }`}
                        >
                            <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                            <span className={`text-[10px] font-bold tracking-wide transition-all duration-200 ${isActive ? "text-white" : ""}`}>
                                {label}
                            </span>

                            {/* Active indicator dot above label */}
                            {isActive && (
                                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-secgreen rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
