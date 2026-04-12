/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F7F9",
        secbg: "#D9DDE0",
        primary: "#2C2F31",
        secondary: "#595C5E",
        primgreen: "#1E5D43",
        secgreen: "#B9F9D6",
        "glass-white": "rgba(255,255,255,0.75)",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"]
      },
      boxShadow: {
        "card": "0 4px 24px rgba(30,93,67,0.08), 0 1px 3px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 32px rgba(30,93,67,0.14), 0 2px 6px rgba(0,0,0,0.08)",
        "green-glow": "0 0 20px rgba(30,93,67,0.25)",
        "green-glow-sm": "0 0 10px rgba(30,93,67,0.2)",
        "pill": "0 2px 8px rgba(30,93,67,0.2)",
        "glass": "0 8px 32px rgba(30,93,67,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "sidebar": "4px 0 24px rgba(30,93,67,0.06)",
      },
      backgroundImage: {
        "grad-green": "linear-gradient(135deg, #1E5D43 0%, #2d7a5a 100%)",
        "grad-card": "linear-gradient(180deg, #ffffff 0%, #f8faf9 100%)",
        "grad-secbg": "linear-gradient(180deg, rgba(217,221,224,0.3) 0%, rgba(217,221,224,0.6) 100%)",
        "grad-progress": "linear-gradient(90deg, #B9F9D6 0%, #1E5D43 100%)",
        "mesh-hero": "radial-gradient(ellipse at 20% 50%, rgba(185,249,214,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,93,67,0.15) 0%, transparent 50%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        floatBlob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-10px, 15px) scale(0.97)" },
        },
        flameDance: {
          "0%, 100%": { transform: "rotate(-8deg) scale(1)" },
          "50%": { transform: "rotate(8deg) scale(1.1)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease both",
        "slide-up": "slideUp 0.5s ease both",
        "slide-up-1": "slideUp 0.5s ease 0.1s both",
        "slide-up-2": "slideUp 0.5s ease 0.2s both",
        "slide-up-3": "slideUp 0.5s ease 0.3s both",
        "slide-in": "slideIn 0.4s ease both",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "float-blob": "floatBlob 8s ease-in-out infinite",
        "float-blob-slow": "floatBlob 12s ease-in-out infinite reverse",
        "flame": "flameDance 0.8s ease-in-out infinite",
        "count-up": "countUp 0.6s ease both",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
