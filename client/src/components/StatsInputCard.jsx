import { Weight, Scale, Zap, Dumbbell, Ruler, ArrowRight } from "lucide-react";
import { LabelIconInput } from "./IconInput";
import IconCheckBox from "./IconCheckbox";

export default function StatsInputCard({
    weight, setWeight,
    height, setHeight,
    goal, setGoal,
    onSubmit, isCalculated, isLoading, onNext,
    bmiValue, category,
}) {
    const bmiColor = () => {
        if (!bmiValue) return "text-primgreen";
        const bmi = parseFloat(bmiValue);
        if (bmi < 18.5) return "text-blue-500";
        if (bmi < 25) return "text-primgreen";
        if (bmi < 30) return "text-amber-500";
        return "text-red-500";
    };

    const bmiRingColor = () => {
        if (!bmiValue) return "border-primgreen/20";
        const bmi = parseFloat(bmiValue);
        if (bmi < 18.5) return "border-blue-200";
        if (bmi < 25) return "border-secgreen";
        if (bmi < 30) return "border-amber-200";
        return "border-red-200";
    };

    return (
        <div className="glass-card shadow-glass rounded-2xl flex flex-col gap-5 p-6 min-h-[450px] w-[340px] sm:w-[400px] animate-slide-up">
            {!isCalculated ? (
                <>
                    {/* Section label */}
                    <p className="text-[10px] font-bold tracking-widest text-secondary/50 uppercase">Your Stats</p>

                    {/* Measurements */}
                    <div className="grid grid-cols-2 gap-4">
                        <LabelIconInput
                            icon={<Weight className="w-4 h-4" />}
                            label="Weight (kg)"
                            type="number"
                            placeholder="70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <LabelIconInput
                            icon={<Ruler className="w-4 h-4" />}
                            label="Height (cm)"
                            type="number"
                            placeholder="175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>

                    {/* Goal section */}
                    <div className="flex flex-col gap-3">
                        <p className="text-[10px] font-bold tracking-widest text-secondary/50 uppercase">Primary Goal</p>
                        <IconCheckBox
                            icon={<Dumbbell className="w-4.5 h-4.5 text-primgreen" />}
                            heading="Muscle Gain"
                            label="High protein focus for growth"
                            checked={goal === "gain"}
                            onChange={() => setGoal("gain")}
                        />
                        <IconCheckBox
                            icon={<Scale className="w-4.5 h-4.5 text-primgreen" />}
                            heading="Maintenance"
                            label="Steady energy and wellness"
                            checked={goal === "maintain"}
                            onChange={() => setGoal("maintain")}
                        />
                        <IconCheckBox
                            icon={<Zap className="w-4.5 h-4.5 text-primgreen" />}
                            heading="Fat Loss"
                            label="Lean profile and definition"
                            checked={goal === "loss"}
                            onChange={() => setGoal("loss")}
                        />
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 gap-6 animate-slide-up">
                    <h2 className="text-lg font-bold text-secondary font-jakarta">Your BMI Index</h2>

                    {/* BMI circle */}
                    <div className={`flex items-center justify-center w-48 h-48 rounded-full border-8 ${bmiRingColor()} bg-white shadow-card`}>
                        <div className="flex flex-col items-center">
                            <span className={`text-5xl font-extrabold ${bmiColor()}`}>{bmiValue ?? "—"}</span>
                            <span className="text-sm font-semibold text-secondary mt-1">{category ?? "—"}</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-secondary/70 font-jakarta px-4 leading-relaxed">
                        Based on your inputs, this is your current Body Mass Index.
                    </p>
                </div>
            )}

            {/* CTA button */}
            <button
                type="button"
                onClick={isCalculated ? onNext : onSubmit}
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 w-full rounded-xl py-3 font-semibold text-sm transition-all duration-200
                    ${isLoading
                        ? "bg-secbg text-secondary/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-primgreen to-primgreen/85 text-white hover:shadow-green-glow hover:scale-[1.02]"
                    }`}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Calculating...
                    </div>
                ) : (
                    <>
                        {isCalculated ? "Go to Dashboard" : "Calculate Goals"}
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    );
}