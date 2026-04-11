import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function LogItem({ log, onDelete }) {
    const protein = (log.quantity / 100) * log.food.proteinPer100g;
    const calories = (log.quantity / 100) * log.food.caloriesPer100g;

    const [translateX, setTranslateX] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // 🟢 TOUCH START
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    // 🟡 TOUCH MOVE
    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (diff > 0) {
            setTranslateX(Math.min(diff, 80)); // limit swipe
        }
    };

    // 🔴 TOUCH END
    const handleTouchEnd = () => {
        setIsDragging(false);

        if (translateX > 40) {
            setTranslateX(80); // snap open
        } else {
            setTranslateX(0); // reset
        }
    };

    return (
        <div className="relative overflow-hidden ">

            {/* 🔴 DELETE BACKGROUND */}
            <div className="absolute inset-0 bg-red-500 flex justify-end items-center pr-4">
                <button
                    onClick={() => onDelete(log.id)}
                    className="text-white"
                >
                    <Trash2 className="w-6 h-6" />
                </button>
            </div>

            {/* 🟢 FOREGROUND CARD */}
            <div
                className="bg-white   transition-transform duration-200"
                style={{ transform: `translateX(-${translateX}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* MOBILE */}
                <div className="flex flex-col hover:bg-secbg/50 transition  gap-2 p-4 md:hidden text-sm border-t">

                    <div className="flex justify-between">
                        <span className="text-gray-400">Food</span>
                        <span className="font-semibold">
                            {log.food.name}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">Qty</span>
                        <span>{log.quantity}g</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">Protein</span>
                        <span className="text-green-600">
                            {protein.toFixed(1)}g
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">Calories</span>
                        <span>{calories.toFixed(0)} kcal</span>
                    </div>

                </div>

                {/* DESKTOP */}
                <div className="hidden hover:bg-secbg/50 transition md:grid grid-cols-5 items-center px-4 py-3 border-t text-sm">

                    <p className="font-semibold truncate">
                        {log.food.name}
                    </p>

                    <p className="text-center">{log.quantity}g</p>

                    <p className="text-green-600 text-center">
                        {protein.toFixed(1)}g
                    </p>

                    <p className="text-center">
                        {calories.toFixed(0)} kcal
                    </p>

                    <button
                        onClick={() => onDelete(log.id)}
                        className="flex p-2 hover:bg-red-300 w-10 rounded-xl justify-center text-red-500"

                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                </div>
            </div>
        </div>
    );
}