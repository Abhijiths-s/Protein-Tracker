import { useEffect, useState } from "react"
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CircularProgress from "./CircularProgress";



export default function NeededProtein(){
    const [stats,setStats] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    


useEffect(() => {
    if (isLoading) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
            console.error("User not logged in");
            return;
        }

        try {
            setIsLoading(true);

            const token = await user.getIdToken();

            const res = await fetch("http://localhost:3000/api/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Unauthorized or failed request");
            }

            const data = await res.json();
            setStats(data);

        } catch (err) {
            console.error("Error fetching dashboard:", err);
        } finally {
            setIsLoading(false);
        }
    });

    return () => unsubscribe();
}, []);
    
    

    return(
        <div className="bg-primgreen flex-col w-full min-h-[220px] shadow-md hover:scale-[1.02] transition-all duration-200 shadow-white/50 rounded-2xl flex items-start justify-center p-6 gap-8">
            <div className="flex flex-col gap-2">
                <p className="font-jakarta text-[12px] text-left text-secgreen/50 font-semibold">NEED TODAY</p>
                <p className="font-bold text-secgreen/50  mt-2 font-jakarta text-2xl">
                    <span className="font-extrabold text-secgreen font-jakarta text-[36px]">
                       {Math.max(stats?.targetProtein-(stats?.totalProtein.toFixed(1) ?? 0),0)}
                    </span>
                    
                   g
                </p>
                 <p className="font-jakarta text-[12px] text-left text-secgreen/50 w-[250px]">
                 Remaining to reach your {stats?.targetProtein}g peak performance goal</p>
            </div>
            
            

        </div>
    )
}