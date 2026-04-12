import { useState } from "react";
import { Trash2, Dumbbell, Flame } from "lucide-react";

export default function LogItem({ log, onDelete }) {
    const protein = (log.quantity / 100) * log.food.proteinPer100g;
    const calories = (log.quantity / 100) * log.food.caloriesPer100g;

    const [translateX, setTranslateX] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const diff = startX - e.touches[0].clientX;
        if (diff > 0) setTranslateX(Math.min(diff, 80));
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setTranslateX(translateX > 40 ? 80 : 0);
    };

    return (
        <div className="relative overflow-hidden animate-slide-up">

            {/* Delete background */}
            <div className="absolute inset-0 bg-gradient-to-l from-red-500 to-red-400 flex items-center justify-end pr-5">
                <button onClick={() => onDelete?.(log.id)} className="text-white">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Foreground card */}
            <div
                className="bg-white transition-transform duration-200 border-b border-secbg/60"
                style={{ transform: `translateX(-${translateX}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* MOBILE */}
                <div className="flex flex-col hover:bg-secgreen/5 transition-colors gap-2.5 p-4 md:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-secgreen/30 flex items-center justify-center">
                                <Dumbbell className="w-3.5 h-3.5 text-primgreen" />
                            </div>
                            <span className="font-semibold text-primary text-sm">{log.food.name}</span>
                        </div>
                        <button
                            onClick={() => onDelete?.(log.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-secondary/40 hover:text-red-400 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-secondary/60 bg-secbg/50 px-2 py-0.5 rounded-full font-medium">
                            {log.quantity}g
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-primgreen bg-secgreen/25 px-2.5 py-0.5 rounded-full">
                            <Dumbbell className="w-3 h-3" />
                            {protein.toFixed(1)}g protein
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                            <Flame className="w-3 h-3" />
                            {calories.toFixed(0)} kcal
                        </span>
                    </div>
                </div>

                {/* DESKTOP */}
                <div className="hidden hover:bg-secgreen/5 transition-colors md:grid grid-cols-5 items-center px-5 py-3.5">
                    {/* Food name */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-secgreen/25 flex items-center justify-center flex-shrink-0">
                            <Dumbbell className="w-3.5 h-3.5 text-primgreen" />
                        </div>
                        <p className="font-semibold text-primary text-sm truncate">{log.food.name}</p>
                    </div>

                    {/* Quantity */}
                    <p className="text-center text-secondary/70 text-sm">
                        <span className="bg-secbg/60 px-2 py-0.5 rounded-full text-xs font-medium">
                            {log.quantity}g
                        </span>
                    </p>

                    {/* Protein */}
                    <p className="flex justify-center">
                        <span className="flex items-center gap-1 text-xs font-bold text-primgreen bg-secgreen/25 px-3 py-1 rounded-full">
                            <Dumbbell className="w-3 h-3" />
                            {protein.toFixed(1)}g
                        </span>
                    </p>

                    {/* Calories */}
                    <p className="flex justify-center">
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                            <Flame className="w-3 h-3" />
                            {calories.toFixed(0)} kcal
                        </span>
                    </p>

                    {/* Delete */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => onDelete?.(log.id)}
                            className="p-2 rounded-xl hover:bg-red-50 text-secondary/30 hover:text-red-400 transition-all duration-200"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}