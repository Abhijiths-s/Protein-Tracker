export default function SideBarButtons({icon,label,isSelected,onClick}){
    return(
        <div 
        onClick={onClick}
        className={`flex items-center p-2 shadow-md cursor-pointer
            ${isSelected ? 'bg-secgreen/70 text-primgreen font-bold':'bg-transparent text-secondary hover:bg-secgreen/30 '}
            shadow-white/50 rounded-lg  min-w-[200px]  gap-2`}>
            {icon && (
                <span className={`${isSelected ? 'text-primgreen':'text-secondary hover:text-primgreen'}`}>{icon}</span>
            )}
            <button className={` ${isSelected ? 'font-bold':''}`}>{label}</button>
        </div>
    )
}