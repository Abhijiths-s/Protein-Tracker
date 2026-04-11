import Icon from "../assets/Icon.png";
import SideBarButtons from "./SidebarButtons";
import { LayoutDashboard,Logs ,ChartBar,X} from "lucide-react";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";


export default function SideBar({isOpen,setIsOpen}){
    const navigate=useNavigate();
    const location=useLocation();
    
    return(

        <>
        {isOpen &&
        (
            <div className="fixed inset-= bg-black/50 z-40 md:hidden"
            onClick={()=>setIsOpen(false)}/>
        )}


        <div className={`h-screen fixed flex flex-col  shadow-md shadow-white/50 bg-white top-0 left-0 p-6 gap-4 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0':'-translate-x-full'}
        md:translate-x-0`}
           >
            <div className="flex justify-between gap-2 items-center p-2">
              
                <div className="flex items-center   gap-2 ">
                    <img src={Icon} alt="logo" className="w-5 h-5" />
                    <h1 className="font-extrabold font-jakarta text-primgreen text-center text-2xl">VitalityFlow</h1>
                </div>
                <button className="md:hidden" onClick={()=>setIsOpen(false)} type="button">
                    <X className="w-5 h-5 text-primgreen hover:text-gray-600"/>
                </button>
            </div>
            <SideBarButtons 
            onClick={() =>
                navigate("/dashboard")}
            isSelected={location.pathname === "/dashboard"} 
            label="Dashboard"
            icon={<LayoutDashboard className="w-5 h-5"/>}/>
            <SideBarButtons 
            onClick={() => 
                navigate("/logs")
            }
            isSelected={location.pathname === "/logs"} 
            label="Logs" 
            icon={<Logs className="w-5 h-5 "/>}/>
            <SideBarButtons 
            onClick={() => navigate("/analytics")}
            isSelected={location.pathname === "/analytics"} 
            label="Analytics" 
            icon={<ChartBar className="w-5 h-5"/>}/>
        </div>
        </>
    ) 
}