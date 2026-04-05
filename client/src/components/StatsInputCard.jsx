import { useState,useEffect } from "react";
import { Weight,Scale ,Zap,Dumbbell,Ruler} from "lucide-react";
import { LabelIconInput } from "./IconInput";
import IconCheckBox from "./IconCheckbox";

export default function StatsInputCard({
    weight,
    setWeight,
    height,
    setHeight,
    goal,
    setGoal,
    onSubmit,
    isCalculated,
    isLoading,
    onNext,
    bmiValue,
    category
}){
    
    return(
        <div className="flex flex-col rounded-xl gap-4 shadow-md drop-shadow-md justify-center p-6 bg-white min-h-[450px] w-[350px] sm:w-[400px]">
            {!isCalculated ? (
                <>
               
                <div className="flex items-center justify-center   gap-6 rounded-full max-w-md font-jakarta">
                <LabelIconInput 
                icon={<Weight className="w-5 h-5 text-primgreen"/>}
                label="Weight(kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                />
                <LabelIconInput 
                icon={<Ruler className="w-5 h-5 text-primgreen"/>} 
                label="Height(cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                />
            </div>

          
            <div className="flex flex-col gap-4 mt-2">
                <span className="text-primary font-jakarta font-semibold">Primary Goal</span>
                <IconCheckBox 
                    icon={<Dumbbell className="w-5 h-5 text-primgreen"/>}
                    heading="Muscle Gain" 
                    label="High protein focus for growth"
                    checked={goal === "gain"}
                    onChange={() => setGoal("gain")}
                    className="border-2 hover:border-primgreen"/>
                <IconCheckBox 
                    icon={<Scale className="w-5 h-5 text-primgreen"/>}
                    heading="Maintenance" 
                    label="Steady energy and wellness"
                    checked={goal === "maintain"}
                    onChange={() => setGoal("maintain")}
                    className="border-2 hover:border-primgreen"/>
                <IconCheckBox 
                    icon={<Zap className="w-5 h-5 text-primgreen"/>}
                    heading="Fat Loss" 
                    label="Lean profile and definition"
                    checked={goal === "loss"}
                    onChange={() => setGoal("loss")}
                    className="border-2 hover:border-primgreen"/>
            </div>
        </>

            ) : (
                <div className="flex flex-col items-center justify-center flex-1 gap-6 animate-in fade-in zoom-in duration-500">
                   <h2 className="text-xl font-bold text-secondary fontjakarta">Your BMI Index</h2>
                    <div className="flex items-center relative justify-center w-60 h-60 rounded-full border-8 border-primgreen/20">
                        <div className="flex flex-col items-center">
                            <span className="text-5xl font-extrabold text-primgreen">{bmiValue||"0.0"}</span>
                            <span className="text-sm font-semibold text-secondary mt-1">{category||"-"}</span>
                        </div>
                    </div>
                    <p className ="text-center text-sm text-secondary px-4">
                        Based on your inputs,this is your current Body Mass Index.
                    </p>
                </div>
            )}


            <button  type="button" 
            onClick={isCalculated ? onNext : onSubmit}
            disabled={isLoading}
            className={`shadow-md  w-full rounded-3xl flex items-center justify-center py-3 ${!isLoading ? 'bg-primgreen text-secgreen' :'bg-gray-400 cursor-not-allowed'} font-semibold transition-colors duration-200`}>
                {
                    isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Calculating...
                            </div>
                    ):(
                        isCalculated ? "Next" : "Calculate"
                    )
                }
            </button>
        </div>
    );
}