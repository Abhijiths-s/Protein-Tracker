import StatsInputCard from "../components/StatsInputCard";
import { useState } from "react";
import { Verified } from "lucide-react";
import { auth } from "../services/firebase";
import nutrtion from "../assets/Nutrition focus.png"
import Icon from "../assets/Icon.png"; 
import { useNavigate } from "react-router-dom";


export default function UserSetup(){

    const [weight,setWeight]=useState("");
    const [height,setHeight] = useState("");
    const [goal,setGoal] = useState("maintain");
    const [goalData,setGoalData] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isCalculated,setIsCalculated] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try{
            const firebaseUser = auth.currentUser;
            if(!firebaseUser){
                alert("User not found!");
                return;
            }
            const token = await firebaseUser.getIdToken();
            const res = await fetch("http://localhost:3000/api/users/setup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({
                    weight:Number(weight),
                    height:Number(height) / 100,
                    goal
                
                })
            });
            const data = await res.json();
            setGoalData({
                protein:data.protein,
                calories:data.calories,
                bmi:data.bmi,
                category:data.category
            });
            setIsCalculated(true);
           
        }

        catch(err){
            console.log(err);
            alert("Something went wrong!");
        }finally{
            setIsLoading(false);
        }
    };

    const handleNext = async () => {
     
        navigate("/dashboard");
    }



    return(
        <div className="bg-background min-h-screen flex items-center justify-center gap-10 p-6">

            <div className="flex flex-col justify-center items-start gap-4"> 
                <div className="flex justify-center items-center gap-4">
                    <img src={Icon} alt="logo" className="w-6 h-6" /> 
                    <h1 className="font-bold font-jakarta text-primgreen text-center text-3xl">
                        VitalityFlow
                    </h1>
                </div>
                <span className="text-secondary">
                    Let's Craft your personal nutrition blueprint
                </span>


                <div className="flex items-center justify-center gap-8">
                    {/* Left section */}
                    <StatsInputCard
                        weight={weight}
                        setWeight={setWeight}
                        height={height}
                        setHeight={setHeight}
                        goal={goal}
                        setGoal={setGoal}
                        onSubmit={handleSubmit}
                        isCalculated={isCalculated}
                        isLoading={isLoading}
                        onNext={handleNext}
                        bmiValue={goalData?.bmi}
                        category={goalData?.category}
                    />
                    {/* Right section */}
                    <div className="z-10 relative hidden md:flex rounded-lg  p-6  bg-primgreen/20 flex-col items-center justify-center">
                        <img src={nutrtion} alt="img" className="w-full top-0 rounded-t-lg absolute z-20"/>
                        <div className="flex flex-col items-center gap-6 p-6 z-30 mt-20 bg-white rounded-lg">
                            <div className="flex justify-center items-center gap-4">
                                <p className="font-jakarta h-fit text-[13px] font-bold text-primgreen bg-secgreen p-2 rounded-lg">
                                    RECOMMENDED DAILY
                                </p>
                                <Verified className="w-5 h-5  text-primgreen rounded-lg"/>
                            
                            </div>
                            <div className="flex justify-center items-center flex-col gap-4">
                                <span className="text-secondary font-semibold text-sm font-jakarta">Target Protein</span>
                                <span className="text-primgreen font-extrabold text-[38px]">
                                    {goalData?.protein ? `${goalData.protein}g`: "-"}
                                </span>
                                <span className="text-secondary font-semibold text-sm font-jakarta">Target Calories</span>
                                <span className="text-primgreen font-extrabold text-[38px]">
                                    {goalData?.calories ? `${goalData.calories}g`: "-"}
                                </span>
                                <p className="text-sm  text-wrap text-clip text-secondary text-center w-[180px]">
                                    "Your body is a temple of potential.This protein target will support your muscle recovery and keep you feelint satiated through the day."
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
                {/* ivde */}
            </div>

        </div>
    );
}