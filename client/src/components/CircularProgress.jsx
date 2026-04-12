export default function CircularProgress({ percentage }) {
    const radius = 70;
    const stroke = 10;
    const trackStroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const safePercentage = Number(percentage) || 0;
    const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

    // Outer glow ring
    const glowRadius = radius - 2;
    const glowCircumference = 2 * Math.PI * glowRadius;
    const glowOffset = glowCircumference - (safePercentage / 100) * glowCircumference;

    return (
        <svg height={radius * 2} width={radius * 2} className="drop-shadow-sm">
            {/* Outer glow ring (decorative) */}
            <circle
                cx={radius}
                cy={radius}
                r={glowRadius}
                stroke="rgba(185,249,214,0.25)"
                strokeWidth={2}
                fill="transparent"
                strokeDasharray={glowCircumference}
                strokeDashoffset={glowOffset}
                strokeLinecap="round"
                style={{
                    transition: "stroke-dashoffset 0.8s ease",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                    filter: "blur(2px)",
                }}
            />

            {/* Track (green tinted) */}
            <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                stroke="rgba(185,249,214,0.35)"
                strokeWidth={trackStroke}
                fill="transparent"
            />

            {/* Progress arc */}
            <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                stroke="url(#greenGrad)"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                style={{
                    transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                    filter: "drop-shadow(0 0 4px rgba(30,93,67,0.5))",
                }}
            />

            {/* Gradient definition */}
            <defs>
                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B9F9D6" />
                    <stop offset="100%" stopColor="#1E5D43" />
                </linearGradient>
            </defs>

            {/* Percentage text */}
            <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#1E5D43"
                fontSize="22"
                fontWeight="800"
                fontFamily="Plus Jakarta Sans, sans-serif"
            >
                {Math.round(safePercentage)}%
            </text>

            {/* Label text */}
            <text
                x="50%"
                y="64%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#595C5E"
                fontSize="10"
                fontWeight="600"
                fontFamily="Plus Jakarta Sans, sans-serif"
            >
                {percentage >= 100 ? "🎉 Complete!" : "Achieved"}
            </text>
        </svg>
    );
}