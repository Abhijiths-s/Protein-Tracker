import { Dumbbell } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import AnalyticsTooltip from "./AnalyticsTooltip";

export default function ProteinChart({ data, targetProtein, loading }) {
    return (
        <div className="bg-white rounded-2xl shadow-card border border-secbg/40 p-6 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-secgreen/25 flex items-center justify-center">
                        <Dumbbell className="w-4 h-4 text-primgreen" />
                    </div>
                    <div>
                        <h2 className="font-extrabold text-primary text-sm font-jakarta">Daily Protein</h2>
                        <p className="text-[10px] text-secondary/50 font-medium font-jakarta">
                            Target:{" "}
                            <span className="text-primgreen font-bold">{targetProtein ?? "—"}g</span>
                        </p>
                    </div>
                </div>

                {/* Legend pill */}
                <div className="flex items-center gap-2 bg-secgreen/15 px-3 py-1.5 rounded-full">
                    <div className="w-3 h-0.5 rounded-full bg-primgreen" />
                    <span className="text-[10px] font-bold text-primgreen font-jakarta">Protein (g)</span>
                </div>
            </div>

            {/* Chart */}
            {loading ? (
                <div className="h-64 bg-secbg/30 rounded-xl animate-pulse" />
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="proteinGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#1E5D43" stopOpacity={0.18} />
                                <stop offset="95%" stopColor="#1E5D43" stopOpacity={0.01} />
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
                            unit="g"
                        />

                        <Tooltip content={<AnalyticsTooltip />} />

                        {targetProtein > 0 && (
                            <ReferenceLine
                                y={targetProtein}
                                stroke="#1E5D43"
                                strokeDasharray="6 4"
                                strokeOpacity={0.5}
                                label={{
                                    value: `Goal ${targetProtein}g`,
                                    position: "insideTopRight",
                                    style: { fontSize: 10, fill: "#1E5D43", fontFamily: "Plus Jakarta Sans", fontWeight: 700 },
                                }}
                            />
                        )}

                        <Area
                            type="monotone"
                            dataKey="protein"
                            stroke="#1E5D43"
                            strokeWidth={2.5}
                            fill="url(#proteinGrad)"
                            dot={{ r: 4, fill: "#1E5D43", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6, fill: "#1E5D43", stroke: "#fff", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
