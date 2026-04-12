import { Check } from "lucide-react";

export default function IconCheckBox({ icon, heading, label, checked, onChange }) {
    return (
        <label
            className={`flex gap-3 items-center border-2 cursor-pointer transition-all duration-200 rounded-xl p-3.5
                ${checked
                    ? "border-primgreen bg-secgreen/20 shadow-green-glow-sm"
                    : "border-secbg/80 bg-white hover:border-primgreen/40 hover:bg-secgreen/5"
                }`}
        >
            {/* Icon badge */}
            {icon && (
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                    ${checked ? "bg-primgreen/15" : "bg-secbg/60"}`}>
                    {icon}
                </div>
            )}

            {/* Text */}
            <div className="flex flex-col flex-1 min-w-0">
                {heading && (
                    <h3 className={`font-bold font-jakarta text-sm transition-colors ${checked ? "text-primgreen" : "text-primary"}`}>
                        {heading}
                    </h3>
                )}
                {label && (
                    <span className="text-secondary/60 text-xs font-medium">{label}</span>
                )}
            </div>

            {/* Custom checkbox */}
            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${checked ? "bg-primgreen border-primgreen" : "border-secbg/80 bg-white"}`}>
                {checked && <Check className="w-3 h-3 text-white stroke-[3]" />}
            </div>

            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
        </label>
    );
}