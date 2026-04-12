import { Flame } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import AnalyticsTooltip from "./AnalyticsTooltip";

export default function CalorieChart({ data, targetCalories, loading }) {
    return (
        <div className="bg-white rounded-2xl shadow-card border border-secbg/40 p-6 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                        <h2 className="font-extrabold text-primary text-sm font-jakarta">Daily Calories</h2>
                        <p className="text-[10px] text-secondary/50 font-medium font-jakarta">
                            Target:{" "}
                            <span className="text-amber-500 font-bold">{targetCalories ?? "—"} kcal</span>
                        </p>
                    </div>
                </div>

                {/* Pill */}
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                    <div className="w-3 h-0.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-bold text-amber-600 font-jakarta">Calories (kcal)</span>
                </div>
            </div>

            {/* Chart */}
            {loading ? (
                <div className="h-64 bg-secbg/30 rounded-xl animate-pulse" />
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="calorieGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.18} />
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(217,221,224,0.5)" vertical={false} />

                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11, fill: "#595C5E", fontFamily: "Plus Jakarta Sans" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: "#595C5E", fontFamily: "Plus Jakarta Sans" }}
                            axisLine={false}
                            tickLine={false}
                            unit=" kcal"
                        />

                        <Tooltip content={<AnalyticsTooltip />} />

                        {targetCalories > 0 && (
                            <ReferenceLine
                                y={targetCalories}
                                stroke="#f59e0b"
                                strokeDasharray="6 4"
                                strokeOpacity={0.5}
                                label={{
                                    value: `Goal ${targetCalories} kcal`,
                                    position: "insideTopRight",
                                    style: { fontSize: 10, fill: "#f59e0b", fontFamily: "Plus Jakarta Sans", fontWeight: 700 },
                                }}
                            />
                        )}

                        <Area
                            type="monotone"
                            dataKey="calories"
                            stroke="#f59e0b"
                            strokeWidth={2.5}
                            fill="url(#calorieGrad)"
                            dot={{ r: 4, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
