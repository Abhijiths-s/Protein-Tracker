import { useEffect, useState } from "react"
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProgressBar from "./StraightProgress";
import { Flame } from "lucide-react";


export default function DailyProtein(){
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
        <div className="bg-secbg/50 w-full min-h-[220px] flex-col shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-white/50 rounded-2xl flex items-start  p-6 gap-4">
            <p className="font-jakarta text-secondary text-[12px] font-bold text-left">
                CALORIES
            </p>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-baseline justify-between flex-row ">

                    <p className="font-extrabold text-primary font-jakarta text-[36px]">
                        {stats?.totalCalories.toFixed(1)}
                    </p>
                    <p className="text-secondary/80 font-jakarta text-sm font-bold">
                        Goal:{stats?.targetCalories}
                    </p>
                </div>
            </div>
            <ProgressBar percentage={Math.min((stats?.totalCalories / stats?.targetCalories) * 100|| 0,100) } />
           <p className="font-jakarta text-secondary text-[11px] font-semibold text-left">
                {stats?.targetCalories-stats?.totalCalories} kcal remaining
            </p> 
            <div className="flex items-end">

                <Flame className="w-5 h-5 text-primgreen"/>
                <p className="text-primgreen font-jakarta font-extrabold text-[11px]">
                   STEADY BURN
                 </p>
            </div>

        </div>
    )
}