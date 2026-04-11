export default function ProgressBar({percentage}) {
    const safePercentage = Math.min(100, percentage);
    
    return(
        <div className ="w-full flex flex-col gap-1">

            {/* BAr */}

            <div className="bg-secbg/50 w-full h-3 rounded-full overflow-hidden">
                <div className="h-full bg-primgreen transition-all duration-500 ease-in-out" 
                    style={{width: `${safePercentage}%`}}/>

            </div>

        </div>
    )
}