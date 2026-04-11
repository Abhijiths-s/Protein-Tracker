import { useEffect, useState } from "react"
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CircularProgress from "./CircularProgress";
import { Check as CheckCircle} from "lucide-react";



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
        <div className="bg-white w-full min-h-[220px] flex-col shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-white/50 rounded-2xl flex items-center justify-between p-6 gap-6">
            <div className="flex flex-row items-center justify-between w-full">

                <div className="flex flex-col gap-2">
                <p className="font-jakarta text-[12px] text-left text-secondary font-semibold">DAILY PROTEIN</p>
                
                    <p className="font-bold text-secondary font-jakarta text-2xl">
                        <span className="font-extrabold text-primary font-jakarta text-3xl">
                            {stats?.totalProtein.toFixed(1) ?? 0}g
                        </span>
                        /{stats?.targetProtein}g
                    </p>
                </div>
            <CheckCircle className="w-5 h-5 text-white  bg-primgreen rounded-full p-1"/>

            </div>
            <CircularProgress percentage={stats?.percentage ?? 0} />
            {(stats?.percentage?? 0) > 50 ?
            (
                <div className="p-2 flex rounded-xl shadow-md w-[200px] shadow-white/50 text-centeritems-center justify-center bg-secgreen text-primgreen font-jakarta text-[12px]">
                    Success! You are closer to your goal.
                </div>

            ):(
                <div className="p-2 flex  text-center w-[200px] shadow-md shadow-white/50 items-center justify-center bg-red-100 text-red-500 text-xs px-3 py-2 rounded-xl">
                    Come On! A lot more to go.
                </div>
            )}

        </div>
    )
}