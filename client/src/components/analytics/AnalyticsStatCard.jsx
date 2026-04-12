// A single summary metric card shown at the top of the Analytics page
export default function AnalyticsStatCard({ label, value, unit, icon, color, bgColor, delay }) {
    return (
        <div
            className="bg-white rounded-2xl shadow-card border border-secbg/40 p-5 flex items-center gap-4 animate-slide-up hover:shadow-card-hover transition-all duration-300"
            style={{ animationDelay: delay }}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor}`}>
                {icon}
            </div>
            <div className="flex flex-col min-w-0">
                <p className="text-[10px] tracking-widest font-bold text-secondary/50 uppercase font-jakarta">
                    {label}
                </p>
                <p className="font-extrabold text-primary text-xl leading-tight font-jakarta">
                    {value ?? "—"}
                    <span className={`text-sm font-semibold ml-1 ${color}`}>{unit}</span>
                </p>
            </div>
        </div>
    );
}
