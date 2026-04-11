import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchFood({onSelectFood})
{
    const [query,setQuery]=useState("");
    const [results,setResults]=useState([]);

    const handleSearch = async (value) =>{

        setQuery(value);

        if(!value) return;

        const res = await fetch(`http://localhost:3000/api/foods/search?query=${value}`);
        const data = await res.json();

        setResults(data);

    }

    return (
        <div className="relative flex items-center w-full sm:w-[280px] md:w-[320px] p-3 bg-secbg rounded-full gap-4 transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/60">
            <span>
                <Search className="w-5 h-5 text-secondary/50"/>
            </span>
            <input
                value={query}
                onChange={(e)=>handleSearch(e.target.value)}
                placeholder="Search foods..."
                className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-primary placeholder-secondary/50"
            />

            {/* dropdown */}
            {results.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-md text-bold font-jakarta rounded-lg z-10">
                    {results.map((food) =>(
                        <>
                        <div 
                            key={food.id}
                            onClick={() =>onSelectFood(food)}
                            className="p-3 text-primary font-semibold hover:bg-primgreen hover:text-secgreen font-jakarta cursor-pointer "
                            >
                                {food.name}
                        </div>
                        <div className="w-full h-[1px] bg-primgreen/50"></div>
                   
                        </>
               
                        ))}
            
        </div>
    )}
    </div>
    );
}