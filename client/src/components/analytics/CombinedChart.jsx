import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AnalyticsTooltip from "./AnalyticsTooltip";

export default function CombinedChart({ data, loading }) {
    return (
        <div className="bg-white rounded-2xl shadow-card border border-secbg/40 p-6 animate-slide-up">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-primgreen/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primgreen" />
                </div>
                <div>
                    <h2 className="font-extrabold text-primary text-sm font-jakarta">
                        Protein vs Calories — Side by Side
                    </h2>
                    <p className="text-[10px] text-secondary/50 font-medium font-jakarta">
                        Both metrics on one view
                    </p>
                </div>
            </div>

            {/* Chart */}
            {loading ? (
                <div className="h-64 bg-secbg/30 rounded-xl animate-pulse" />
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(217,221,224,0.5)" vertical={false} />

                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11, fill: "#595C5E", fontFamily: "Plus Jakarta Sans" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* Left axis — protein */}
                        <YAxis
                            yAxisId="protein"
                            orientation="left"
                            tick={{ fontSize: 11, fill: "#1E5D43", fontFamily: "Plus Jakarta Sans" }}
                            axisLine={false}
                            tickLine={false}
                            unit="g"
                        />

                        {/* Right axis — calories */}
                        <YAxis
                            yAxisId="calories"
                            orientation="right"
                            tick={{ fontSize: 11, fill: "#f59e0b", fontFamily: "Plus Jakarta Sans" }}
                            axisLine={false}
                            tickLine={false}
                            unit=" kcal"
                        />

                        <Tooltip content={<AnalyticsTooltip />} />

                        <Legend
                            wrapperStyle={{
                                fontSize: "11px",
                                fontFamily: "Plus Jakarta Sans",
                                paddingTop: "12px",
                            }}
                        />

                        <Line
                            yAxisId="protein"
                            type="monotone"
                            dataKey="protein"
                            stroke="#1E5D43"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: "#1E5D43", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6 }}
                            name="Protein (g)"
                        />
                        <Line
                            yAxisId="calories"
                            type="monotone"
                            dataKey="calories"
                            stroke="#f59e0b"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6 }}
                            name="Calories (kcal)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
