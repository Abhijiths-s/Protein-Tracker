export default function CircularProgress({percentage}){

    const radius = 70;
    const stroke = 10;
    const normalizedRadius = radius - stroke/2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const safePercentage= Number(percentage)|| 0;

    const strokeDashoffset =
        circumference - (safePercentage / 100) * circumference;

    return(
        <svg height={radius * 2} width={radius * 2}>
            <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                stroke="#e5e7eb"
                strokeWidth={stroke}
                fill="transparent"
                />
            <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                stroke="#1E5D43"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                style={{
                    transition:"stroke-dashoffset 0.6s ease",
                    transform:"rotate(-90deg)",
                    transformOrigin:"50% 50%",
                }}
                />

                <text 
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-primgreen font-extrabold text-3xl"
                >
                    {Math.round(safePercentage)}%
                </text>
                <text 
                    x="50%"
                    y="65%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-secondary font-semibold text-[12px]"
                >
                    {percentage >= 100 ? "Completed 🎉" : "Achieved"}
                </text>
        </svg>

    );
}