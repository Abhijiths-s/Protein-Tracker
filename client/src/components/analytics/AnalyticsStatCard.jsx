// A single summary metric card shown at the top of the Analytics page
export default function AnalyticsStatCard({ label, value, unit, icon, color, bgColor, delay }) {
    return (
        <div
            className="bg-white rounded-2xl shadow-card border border-secbg/40 p-3 sm:p-5 flex items-center gap-3 sm:gap-4 animate-slide-up hover:shadow-card-hover transition-all duration-300"
            style={{ animationDelay: delay }}
        >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor}`}>
                <div className="scale-75 sm:scale-100 flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] tracking-widest font-bold text-secondary/50 uppercase font-jakarta truncate">
                    {label}
                </p>
                <div className="font-extrabold text-primary text-lg sm:text-xl leading-tight font-jakarta flex flex-wrap items-baseline gap-x-1 mt-0.5">
                    <span>{value ?? "—"}</span>
                    <span className={`text-[10px] sm:text-sm font-semibold ${color} whitespace-nowrap`}>{unit}</span>
                </div>
            </div>
        </div>
    );
}
