export default function ProgressBar({ percentage }) {
    const safePercentage = Math.min(100, Math.max(0, percentage || 0));

    return (
        <div className="w-full flex flex-col gap-1.5">
            {/* Track */}
            <div className="bg-secgreen/20 w-full h-3 rounded-full overflow-hidden relative">
                {/* Fill */}
                <div
                    className="h-full rounded-full progress-fill transition-all duration-700 ease-out relative"
                    style={{ width: `${safePercentage}%` }}
                >
                    {/* Shimmer sweep */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2s linear infinite",
                        }}
                    />
                </div>

                {/* Percentage label inside if > 30% */}
                {safePercentage > 30 && (
                    <span
                        className="absolute inset-y-0 left-0 flex items-center pl-2 text-[9px] font-bold text-white/90"
                        style={{ width: `${safePercentage}%` }}
                    >
                        {Math.round(safePercentage)}%
                    </span>
                )}
            </div>
        </div>
    );
}