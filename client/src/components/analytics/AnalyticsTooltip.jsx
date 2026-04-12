// Styled tooltip for recharts charts
export default function AnalyticsTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <div className="glass-card-strong rounded-xl px-4 py-3 shadow-card border border-secbg/40 font-jakarta min-w-[150px]">
            <p className="text-[10px] font-bold tracking-widest text-secondary/50 uppercase mb-2">
                {label}
            </p>
            {payload.map((entry) => (
                <div key={entry.dataKey} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-secondary font-medium">
                            {entry.dataKey === "protein" ? "Protein" : "Calories"}
                        </span>
                    </div>
                    <span className="text-xs font-extrabold text-primary">
                        {typeof entry.value === "number" ? entry.value.toFixed(1) : entry.value}
                        {entry.dataKey === "protein" ? "g" : " kcal"}
                    </span>
                </div>
            ))}
        </div>
    );
}
