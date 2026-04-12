export function IconInput({ icon, wrapperClass = "", ...props }) {
    return (
        <div className={`flex items-center w-full px-4 py-3 bg-white border border-secbg/80 rounded-xl transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/20 ${wrapperClass}`}>
            {icon && (
                <span className="flex items-center justify-center text-secondary/40 mr-3 flex-shrink-0 focus-within:text-primgreen transition-colors">
                    {icon}
                </span>
            )}
            <input
                className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 shadow-none text-primary placeholder-secondary/40 text-sm"
                {...props}
            />
        </div>
    );
}

export function PasswordInput({ icon1, icon2, wrapperClass = "", onIcon2Click, ...props }) {
    return (
        <div className={`flex items-center w-full px-4 py-3 bg-white border border-secbg/80 rounded-xl transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/20 ${wrapperClass}`}>
            {icon1 && (
                <span className="flex items-center justify-center text-secondary/40 mr-3 flex-shrink-0">
                    {icon1}
                </span>
            )}
            <input
                className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 shadow-none text-primary placeholder-secondary/40 text-sm"
                {...props}
            />
            {icon2 && (
                <button
                    type="button"
                    onClick={onIcon2Click}
                    className="flex items-center justify-center text-secondary/40 ml-2 hover:text-primgreen transition-colors flex-shrink-0"
                >
                    {icon2}
                </button>
            )}
        </div>
    );
}

export function LabelIconInput({ label, icon, wrapperClass = "", ...props }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                {icon && <span className="text-primgreen">{icon}</span>}
                <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">{label}</label>
            </div>
            <div className={`flex items-center w-full px-4 py-3 bg-white border border-secbg/80 rounded-xl transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/20 ${wrapperClass}`}>
                <input
                    className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 shadow-none text-primary placeholder-secondary/40 text-sm"
                    {...props}
                />
            </div>
        </div>
    );
}