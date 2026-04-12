import { Search } from "lucide-react";

export default function SearchBox() {
    return (
        <div className="flex items-center w-full sm:w-[280px] md:w-[320px] px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full gap-3 border border-secbg/80 shadow-sm transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/20 focus-within:shadow-green-glow-sm group">
            <Search className="w-4 h-4 text-secondary/40 flex-shrink-0 group-focus-within:text-primgreen transition-colors duration-200" />
            <input
                type="text"
                placeholder="Search foods..."
                className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 text-sm text-primary placeholder-secondary/40"
            />
        </div>
    );
}
