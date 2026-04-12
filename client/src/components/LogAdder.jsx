import { useState, useEffect, useRef } from "react";
import { auth } from "../services/firebase";
import { Search, Plus, Dumbbell, Flame, X } from "lucide-react";

export default function LogAdder({ onLogAdded }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = async (value) => {
        setQuery(value);
        if (!value) { setResults([]); return; }

        const user = auth.currentUser;
        const token = await user.getIdToken();
        const res = await fetch(`http://localhost:3000/api/foods/search?query=${value}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
    };

    const protein = selectedFood && quantity
        ? ((selectedFood.proteinPer100g / 100) * quantity).toFixed(1) : 0;
    const calories = selectedFood && quantity
        ? ((selectedFood.caloriesPer100g / 100) * quantity).toFixed(0) : 0;

    const handleAdd = async () => {
        if (!selectedFood) { alert("Select a food first"); return; }
        if (!quantity || quantity <= 0) { alert("Enter valid quantity"); return; }

        const user = auth.currentUser;
        const token = await user.getIdToken();

        const res = await fetch("http://localhost:3000/api/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ foodId: selectedFood.id, quantity: Number(quantity) }),
        });

        if (!res.ok) { const text = await res.text(); console.error("Backend error:", text); return; }

        setQuery(""); setQuantity(""); setSelectedFood(null); setResults([]);
        if (onLogAdded) onLogAdded();
    };

    return (
        <div className="glass-card shadow-glass rounded-2xl p-6 w-full animate-slide-up">
            <div className="flex flex-col gap-5 w-full">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-primgreen/10 flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5 text-primgreen" />
                    </div>
                    <h3 className="font-jakarta font-bold text-primary text-sm">Add Food Entry</h3>
                </div>

                {/* Input row */}
                <div className="flex flex-col md:flex-row gap-3 w-full">

                    {/* Food search */}
                    <div ref={dropdownRef} className="relative flex-1">
                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase mb-1.5 block">Food</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40" />
                            <input
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search food..."
                                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-secbg/80 outline-none text-sm text-primary placeholder-secondary/40 focus:border-primgreen focus:ring-2 focus:ring-primgreen/20 transition-all duration-200"
                            />
                            {selectedFood && (
                                <button
                                    onClick={() => { setSelectedFood(null); setQuery(""); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-secondary transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Dropdown */}
                        {showDropdown && results.length > 0 && (
                            <div className="absolute z-20 w-full bg-white shadow-card rounded-xl mt-1 max-h-44 overflow-y-auto border border-secbg/40 animate-fade-in">
                                {results.map((food) => (
                                    <div
                                        key={food.id}
                                        onClick={() => {
                                            setSelectedFood(food);
                                            setQuery(food.name);
                                            setShowDropdown(false);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2.5 hover:bg-secgreen/15 cursor-pointer transition-colors text-sm text-primary border-b border-secbg/30 last:border-0"
                                    >
                                        <Dumbbell className="w-3.5 h-3.5 text-primgreen/50 flex-shrink-0" />
                                        {food.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="w-full md:w-28">
                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase mb-1.5 block">Qty (g)</label>
                        <input
                            type="number"
                            min={0}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full py-2.5 px-3 rounded-xl bg-white border border-secbg/80 outline-none text-sm text-primary focus:border-primgreen focus:ring-2 focus:ring-primgreen/20 transition-all duration-200"
                            placeholder="100"
                        />
                    </div>

                    {/* Protein preview */}
                    <div className="w-full md:w-28">
                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase mb-1.5 block">Protein</label>
                        <div className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-secgreen/15 border border-secgreen/30">
                            <Dumbbell className="w-3.5 h-3.5 text-primgreen flex-shrink-0" />
                            <span className="text-sm font-bold text-primgreen">{protein}g</span>
                        </div>
                    </div>

                    {/* Calories preview */}
                    <div className="w-full md:w-28">
                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase mb-1.5 block">Calories</label>
                        <div className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-50 border border-amber-100">
                            <Flame className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                            <span className="text-sm font-bold text-amber-600">{calories}</span>
                        </div>
                    </div>

                    {/* Add button */}
                    <div className="flex items-end">
                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 bg-gradient-to-r from-primgreen to-primgreen/85 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-green-glow hover:scale-[1.03] transition-all duration-200 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}