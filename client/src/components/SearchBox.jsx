import { Search } from "lucide-react"

export default function SearchBox(){
    return(
        <div className="flex items-center w-full sm:w-[280px] md:w-[320px] p-3 bg-secbg rounded-full gap-4 transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/60">
            <span>
                <Search className="w-5 h-5 text-secondary/50"/>
            </span>
            <input type="text" placeholder="Search foods.." className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-primary placeholder-secondary/50"/>
        </div>
    )
}
