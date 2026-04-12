import Icon from "../assets/Icon.png";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-secbg/60 bg-white/60 backdrop-blur-sm font-jakarta">
            <div className="px-6 md:px-8 py-4 flex items-center justify-between gap-4">

                {/* Brand mark */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-primgreen/70 to-secgreen/50 rounded-lg flex items-center justify-center shadow-green-glow-sm">
                        <img src={Icon} alt="Vita Flux" className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-extrabold text-primgreen text-xs tracking-tight">Vita Flux</span>
                </div>

                {/* Copyright */}
                <p className="text-[11px] text-secondary/50 font-medium">
                    © {year} Vita Flux. All rights reserved.
                </p>

            </div>
        </footer>
    );
}
