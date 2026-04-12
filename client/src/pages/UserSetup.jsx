import StatsInputCard from "../components/StatsInputCard";
import { useState } from "react";
import { auth } from "../services/firebase";
import Icon from "../assets/Icon.png";
import nutrtion from "../assets/Nutrition focus.png";
import { useNavigate } from "react-router-dom";
import { Verified, Dumbbell, Flame } from "lucide-react";
import Footer from "../components/Footer";

export default function UserSetup() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [goal, setGoal] = useState("maintain");
    const [goalData, setGoalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) { alert("User not found!"); return; }

            const token = await firebaseUser.getIdToken();
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const res = await fetch(`${API_URL}/api/users/setup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    weight: Number(weight),
                    height: Number(height) / 100,
                    goal,
                }),
            });
            const data = await res.json();
            setGoalData({ protein: data.protein, calories: data.calories, bmi: data.bmi, category: data.category });
            setIsCalculated(true);
        } catch (err) {
            console.log(err);
            alert("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative bg-background min-h-screen flex flex-col overflow-hidden">

            {/* Background blobs */}
            <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 animate-float-blob pointer-events-none"
                style={{ background: "radial-gradient(circle, #B9F9D6 0%, transparent 70%)" }}
            />
            <div
                className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15 animate-float-blob-slow pointer-events-none"
                style={{ background: "radial-gradient(circle, #1E5D43 0%, transparent 70%)" }}
            />

            <div className="flex-1 flex items-center justify-center gap-10 p-6">
            <div className="flex flex-col justify-center items-start gap-6 z-10">
                {/* Logo */}
                <div className="flex justify-center items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primgreen to-primgreen/70 rounded-xl flex items-center justify-center shadow-green-glow-sm">
                        <img src={Icon} alt="logo" className="w-4 h-4" />
                    </div>
                    <h1 className="font-extrabold font-jakarta text-primgreen text-2xl tracking-tight">
                        Vita Flux
                    </h1>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="font-extrabold font-jakarta text-primary text-2xl md:text-3xl">
                        Craft your nutrition<br />
                        <span className="text-primgreen">blueprint</span>
                    </h2>
                    <p className="text-secondary/60 text-sm font-jakarta">
                        Let's personalize your protein and calorie targets.
                    </p>
                </div>

                <div className="flex items-start justify-center gap-8 flex-col md:flex-row">
                    {/* Left — stats card */}
                    <StatsInputCard
                        weight={weight} setWeight={setWeight}
                        height={height} setHeight={setHeight}
                        goal={goal} setGoal={setGoal}
                        onSubmit={handleSubmit}
                        isCalculated={isCalculated}
                        isLoading={isLoading}
                        onNext={() => navigate("/dashboard")}
                        bmiValue={goalData?.bmi}
                        category={goalData?.category}
                    />

                    {/* Right — result card (desktop) */}
                    <div className="z-10 relative hidden md:flex rounded-2xl overflow-hidden shadow-card bg-white flex-col w-[300px]">
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden bg-primgreen/10">
                            <img src={nutrtion} alt="nutrition" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-5 p-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-primgreen bg-secgreen/30 px-3 py-1 rounded-full">
                                    RECOMMENDED DAILY
                                </span>
                                <Verified className="w-4 h-4 text-primgreen" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1 p-3 rounded-xl bg-secgreen/10 border border-secgreen/30">
                                    <div className="flex items-center gap-1">
                                        <Dumbbell className="w-3.5 h-3.5 text-primgreen" />
                                        <span className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">Protein</span>
                                    </div>
                                    <span className="text-2xl font-extrabold text-primgreen">
                                        {goalData?.protein ? `${goalData.protein}g` : "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 p-3 rounded-xl bg-amber-50 border border-amber-100">
                                    <div className="flex items-center gap-1">
                                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                                        <span className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">Calories</span>
                                    </div>
                                    <span className="text-2xl font-extrabold text-amber-600">
                                        {goalData?.calories ? `${goalData.calories}` : "—"}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-secondary/60 font-jakarta leading-relaxed">
                                Your protein target supports muscle recovery and keeps you satiated throughout the day.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <Footer />
        </div>
    );
}