import { onAuthStateChanged } from "firebase/auth";
import { MenuIcon,Plus} from "lucide-react";
import SideBar from "../components/SideBar";
import { useState,useEffect } from "react";
import { auth } from "../services/firebase";
import LogAdder from "../components/LogAdder";
import LogItem from "../components/LogItem";
import Icon from "../assets/Icon.png";

export default function Logs(){
    const [isOpen,setIsOpen]=useState(true);
    const [logs,setLogs]=useState([]);
    const [showForm,setShowForm]=useState(false);

        const fetchLogs = async (user) => {
            if (!user) return;

            const token = await user.getIdToken();

            const res = await fetch("http://localhost:3000/api/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setLogs(data.logs || []);
        };
    

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    console.log("User not logged in yet");
                    return;
                }

                try {
                    await fetchLogs(user);

                } catch (err) {
                    console.error("Error fetching logs:", err);
                }
            });

            return () => unsubscribe();
        }, []);

        const deleteLog = async (logId) => {
            const user = auth.currentUser;
            if (!user) return;

            const token = await user.getIdToken();

            await fetch(`http://localhost:3000/api/logs/${logId}`, {
                method: "DELETE",
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            await fetchLogs(user);
        }




    



    return(
        <div className="bg-background font-jakarta p-6 min-h-screen flex items-start justify-center">
            
                <div className="flex md:hidden items-center justify-between p-4 bg-white shadow-sm fixed top-0 left-0 rounded-lg hover:bg-secgreen/30">                       
                    {/* Clicking this sets isOpen to true */}
                    <button onClick={() => setIsOpen(true)}>
                        <MenuIcon className="w-6 h-6 text-primgreen" />
                    </button>
                </div>
                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="md:ml-[250px] w-full flex flex-col gap-6 px-4 md:px-8 py-6">
                <div className="flex items-center gap-4">
                    <span className="rounded-xl bg-secgreen p-3">
                        <img src={Icon} alt="logo" className="w-5 h-5" />
                    </span>

                    <div>
                        <h1 className="text-primary font-extrabold text-2xl md:text-3xl">
                            Food Logs
                        </h1>
                        <p className="text-secondary text-xs md:text-sm">
                            Track your daily intake
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center ">
                        <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden">

    {/* HEADER */}
                                <div className="hidden md:grid grid-cols-5 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-600">
                                    <p>Food</p>
                                    <p className="text-center">Qty</p>
                                    <p className="text-center">Protein</p>
                                    <p className="text-center">Calories</p>
                                </div>

                                {/* LIST */}
                                {logs.length > 0 ? (
                                    logs.map((log) => (
                                        <LogItem key={log.id} log={log} onDelete={deleteLog}/>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-400">
                                        No logs for today
                                    </div>
                                )}

                            </div>
                        {showForm?
                        (
                            <LogAdder
                                onLogAdded={async ()=> {
                                    const user = auth.currentUser;
                                    if (!user) return;

                                    await fetchLogs(user);
                                    setShowForm(false);
                                }}
                                />
                        ):
                        (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-primgreen text-white px-4 py-2 rounded-lg font-semibold hover:scale-[1.02] transition"
                        >
                            <Plus className="w-5 h-5" />
                            Add Log
                        </button>
                        
                        )}
                    </div>
            </div>

        </div>
    );
}