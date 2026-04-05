export default function IconCheckBox({icon,heading,label,checked,onChange}){
    return(
        <label className={`flex gap-2 max-w-md justify-around border-2 hover:border-primgreen  ${checked ? 'border-primgreen bg-secgreen ':'bg-secbg border-none'} cursor-pointer transition-colors rounded-xl flex-2  p-4`}>

            {icon && (
                <span className="flex rounded-full p-4 bg-primgreen/10 items-center justify-center text-gray-500 mr-2">
                {icon}
                </span>
            )}

            <div className="flex flex-col flex-grow">
                {heading &&
                    <h1 className="font-bold text-primary font-jakarta text-lg">
                        {heading}
                    </h1>
                }
                {label &&
                    <span className="text-secondary font-semibold text-sm">
                        {label}
                    </span>
                }
            </div>
            <div className="flex items-center justify-center">

                <input type="checkbox" checked={checked} onChange={onChange} className="appearance-none w-4 h-4 border-2 text-secgreen border-black rounded-full  checked:bg-primgreen checked:border-primgreen cursor-pointer relative"></input>

            </div>
        </label>
    )
}