import { useState,useEffect } from "react";
import SideBar from "../components/SideBar";
import DailyProtein from "../components/DailyProtein";
import CalorieTracker from "../components/CalorieTracker";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import NeededProtein from "../components/NeededProtein";
import Icon from "../assets/Icon.png";
import SearchBox from "../components/SearchBox";
import LogItem from "../components/LogItem";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Dashboard() {
  
  const [isOpen,setIsOpen]=useState(true);
  const [loading,setLoading]=useState(true);
  const [logs,setLogs]=useState([]);


useEffect(() => {
    

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
            console.error("User not logged in");
            return;
        }

        try {
          

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
            setLogs(data.logs || []);

        } catch (err) {
            console.error("Error fetching dashboard:", err);
        } finally {
            setLoading(false);
        }
    });

    return () => unsubscribe();
}, []);

  return (
    <div className="text-black relative bg-background min-h-screen w-full flex items-start pt-6  gap-4">
      <div className="flex md:hidden items-center justify-between p-4 bg-white shadow-sm fixed top-0 left-0 rounded-lg hover:bg-secgreen/30">
                
                {/* Clicking this sets isOpen to true */}
                <button onClick={() => setIsOpen(true)}>
                    <MenuIcon className="w-6 h-6 text-primgreen" />
                </button>
       </div>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* dashboard rightside */}
      <div className="flex flex-col w-full md:ml-[250px] items-center justify-center gap-6 px-4 md:px-8 py-6">

        {/* Rightside tracker */}
        <div className=" grid grid-cols-1 gap-6 w-full sm:grid-cols-2 lg:grid-cols-3 items-start">

            <DailyProtein />
            <CalorieTracker/>
            <NeededProtein/>
        </div>

        {/* Food Logging */}
        <div className="flex flex-col sm:items-center sm:justify-between items-start sm:flex-row  gap-4 p-6 w-full">
          <div className="flex flex-row items-center gap-4">
            <span className="rounded-xl bg-secgreen p-3">
              <img src={Icon} alt="logo" className="w-5 h-5" />
            </span>
            <span className="flex flex-col gap-2">
              <h1 className="font-jakarta font-extrabold text-primary text-3xl">Food Logging</h1>
              <p className="font-jakarta text-secondary text-xs">Tracking fuel for your vitality Flow</p>
            </span>
          </div>
          <SearchBox/>

        </div>
        <div className="flex flex-col bg-secbg p-6 w-full rounded-xl items-center">

        {loading && (
          <p className="text-sm text-secondary font-jakarta font-semibold">Loading logs...</p>
        )}

        {logs.length === 0 ?(
          <div className="text-sm text-secondary font-jakarta font-semibold">
            No logs entered for today
            </div>
        ):
        (
          <div className="flex flex-col  w-full">
            {logs.map((logs) =>(
            <LogItem log={logs} key={logs.id}/>
            ))}
          </div>
        )}



        </div>
      </div>
    </div>
  );
}