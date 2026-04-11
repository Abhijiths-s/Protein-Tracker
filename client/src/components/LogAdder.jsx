import { useState, useEffect, useRef } from "react";
import { auth } from "../services/firebase";


export default function LogAdder({ onLogAdded }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef();

    //Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //Search handler
    const handleSearch = async (value) => {
        setQuery(value);

        if (!value) {
            setResults([]);
            return;
        }

        const user = auth.currentUser;
        const token = await user.getIdToken();

        const res = await fetch(
            `http://localhost:3000/api/foods/search?query=${value}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
    };

    //Calculations
    const protein =
        selectedFood && quantity
            ? ((selectedFood.proteinPer100g / 100) * quantity).toFixed(1)
            : 0;

    const calories =
        selectedFood && quantity
            ? ((selectedFood.caloriesPer100g / 100) * quantity).toFixed(0)
            : 0;

    // 🔹 Add log
    const handleAdd = async () => {
        if (!selectedFood) {
        alert("Select a food first");
        return;
    }

    if (!quantity || quantity <= 0) {
        alert("Enter valid quantity");
        return;
    }

        const user = auth.currentUser;
        const token = await user.getIdToken();

        const res = await fetch("http://localhost:3000/api/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                foodId: selectedFood.id,
                quantity: Number(quantity)
            })
        });

        if(!res.ok) {
            const text=await res.text();
            console.error("Backend error:", text);
            return;
        }

        const data =await res.json();
        console.log("Log added:", data);


        // reset
        setQuery("");
        setQuantity("");
        setSelectedFood(null);
        setResults([]);

        if (onLogAdded) onLogAdded(); // 🔥 for refresh later
    };

    return (
        <div className="bg-secbg rounded-2xl p-6 w-full">
            <div className="flex flex-col gap-6 w-full">

                {/* HEADER */}
               

                {/* INPUT ROW */}
                <div className="flex flex-col md:flex-row gap-4 w-full">

                    {/* FOOD INPUT */}
                    <div ref={dropdownRef} className="relative w-full">
                        <label className="text-sm font-semibold text-secondary">Food</label>

                        <input
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Type food name..."
                            className="w-full p-2 rounded-lg bg-white border outline-none"
                        />

                        {/* DROPDOWN */}
                        {showDropdown && results.length > 0 && (
                            <div className="absolute z-10 w-full bg-white shadow-md rounded-lg mt-1 max-h-40 overflow-y-auto">
                                {results.map((food) => (
                                    <div
                                        key={food.id}
                                        onClick={() => {
                                            setSelectedFood(food);
                                            setQuery(food.name);
                                            setShowDropdown(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {food.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* QUANTITY */}
                    <div className="w-full md:w-32">
                        <label className="text-sm font-semibold text-secondary">Quantity(g)</label>
                        <input
                            type="number"
                            min={0}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white border"
                        />
                    </div>

                    {/* PROTEIN */}
                    <div className="w-full md:w-32">
                        <label className="text-sm font-semibold text-secondary">Protein</label>
                        <div className="bg-white p-2 rounded-lg">
                            {protein} g
                        </div>
                    </div>

                    {/* CALORIES */}
                    <div className="w-full md:w-32">
                        <label className="text-sm font-semibold text-secondary">Calories</label>
                        <div className="bg-white p-2 rounded-lg">
                            {calories}
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div className="flex items-end">
                        <button
                            onClick={handleAdd}
                            className="bg-primgreen text-white px-4 py-2 rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}