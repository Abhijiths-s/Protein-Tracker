export default function SideBarButtons({ icon, label, isSelected, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 font-jakarta text-sm select-none
                ${isSelected
                    ? "bg-gradient-to-r from-primgreen to-primgreen/85 text-white shadow-pill font-semibold"
                    : "text-secondary hover:bg-secgreen/25 hover:text-primgreen hover:translate-x-0.5"
                }`}
        >
            {/* Active indicator bar */}
            {isSelected && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-secgreen rounded-full" />
            )}

            {/* Icon */}
            {icon && (
                <span className={`flex-shrink-0 transition-colors duration-200 ${isSelected ? "text-secgreen" : ""}`}>
                    {icon}
                </span>
            )}

            <span className="flex-1">{label}</span>

            {/* Active dot */}
            {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-secgreen/70" />
            )}
        </div>
    );
}