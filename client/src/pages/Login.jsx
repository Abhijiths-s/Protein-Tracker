import { IconInput, PasswordInput } from "../components/IconInput";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, loginWithEmail } from "../services/authService";
import Icon from "../assets/Icon.png";
import { Lock, Mail, ArrowRight, Eye, EyeOff, Zap, Shield, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signupWithEmail } from "../services/authService";
import api from "../services/api";

// ── Firebase error → human-readable message map ─────────────
const FIREBASE_ERRORS = {
    "auth/invalid-email":              { field: "email",    msg: "That email address looks invalid. Please check it." },
    "auth/user-not-found":             { field: "email",    msg: "No account found with this email. Try creating one." },
    "auth/wrong-password":             { field: "password", msg: "Incorrect password. Please try again." },
    "auth/invalid-credential":         { field: "password", msg: "Wrong email or password. Please check and try again." },
    "auth/too-many-requests":          { field: "general",  msg: "Too many failed attempts. Your account is temporarily locked. Try again later or reset your password." },
    "auth/user-disabled":              { field: "email",    msg: "This account has been disabled. Please contact support." },
    "auth/email-already-in-use":       { field: "email",    msg: "This email is already registered. Sign in instead?" },
    "auth/weak-password":              { field: "password", msg: "Password is too weak. Use at least 6 characters." },
    "auth/network-request-failed":     { field: "general",  msg: "Network error. Please check your internet connection." },
    "auth/popup-closed-by-user":       { field: "general",  msg: "Google sign-in was cancelled. Please try again." },
    "auth/operation-not-allowed":      { field: "general",  msg: "This sign-in method is not enabled. Contact support." },
    "auth/account-exists-with-different-credential": {
        field: "general",
        msg: "An account with this email already exists using a different sign-in method.",
    },
};

function parseFirebaseError(err) {
    const code = err?.code ?? "";
    return FIREBASE_ERRORS[code] ?? { field: "general", msg: err?.message ?? "Something went wrong. Please try again." };
}

// ── Haptic feedback via Vibration API ───────────────────────
function triggerHaptic() {
    if (navigator.vibrate) {
        navigator.vibrate([30, 30, 30]); // buzz-pause-buzz
    }
}

// ── Inline error component ───────────────────────────────────
function FieldError({ msg }) {
    if (!msg) return null;
    return (
        <div className="flex items-start gap-2 mt-1 animate-slide-up">
            <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-500 font-medium leading-snug">{msg}</p>
        </div>
    );
}

// ── General error banner ─────────────────────────────────────
function ErrorBanner({ msg, onDismiss }) {
    if (!msg) return null;
    return (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-slide-up">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 font-medium flex-1 leading-snug">{msg}</p>
            <button onClick={onDismiss} className="text-red-400 hover:text-red-600 text-xs font-bold flex-shrink-0">✕</button>
        </div>
    );
}

// ── Success banner ───────────────────────────────────────────
function SuccessBanner({ msg }) {
    if (!msg) return null;
    return (
        <div className="flex items-center gap-3 bg-secgreen/20 border border-secgreen rounded-xl px-4 py-3 animate-slide-up">
            <CheckCircle2 className="w-4 h-4 text-primgreen flex-shrink-0" />
            <p className="text-sm text-primgreen font-semibold">{msg}</p>
        </div>
    );
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    const navigate = useNavigate();

    // Error state: { email, password, general }
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [shake, setShake] = useState(false);

    // Trigger shake + haptic
    const triggerError = useCallback((errMap) => {
        setErrors(errMap);
        triggerHaptic();
        setShake(true);
        setTimeout(() => setShake(false), 400);
    }, []);

    const clearErrors = () => setErrors({});

    // ── Google Login ────────────────────────────────────────
    const handleGoogleLogin = async () => {
        if (loading) return;
        clearErrors();
        setLoading(true);
        try {
            const { user, token } = await loginWithGoogle();
            localStorage.setItem("token", token);
            const res = await api.post("/api/users/create");
            const userData = res.data;
            navigate(!userData.weight || !userData.height ? "/usersetup" : "/dashboard");
        } catch (err) {
            const { field, msg } = parseFirebaseError(err);
            triggerError({ [field]: msg });
        } finally {
            setLoading(false);
        }
    };

    // ── Email Login ─────────────────────────────────────────
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        if (loading) return;
        clearErrors();

        // Client-side validation
        if (!email.trim()) { triggerError({ email: "Please enter your email address." }); return; }
        if (!password) { triggerError({ password: "Please enter your password." }); return; }

        setLoading(true);
        try {
            const { token } = await loginWithEmail(email, password);
            localStorage.setItem("token", token);
            const res = await api.post("/api/users/create");
            const userData = res.data;
            navigate(!userData.weight || !userData.height ? "/usersetup" : "/dashboard");
        } catch (err) {
            const { field, msg } = parseFirebaseError(err);
            triggerError({ [field]: msg });
        } finally {
            setLoading(false);
        }
    };

    // ── Create Account ──────────────────────────────────────
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (loading) return;
        clearErrors();
        setSuccess("");

        // Client-side validation
        if (!createEmail.trim()) { triggerError({ email: "Please enter your email address." }); return; }
        if (!createPassword) { triggerError({ password: "Please enter a password." }); return; }
        if (createPassword.length < 6) { triggerError({ password: "Password must be at least 6 characters." }); return; }
        if (createPassword !== confirmPassword) {
            triggerError({ confirm: "Passwords don't match. Please re-check." });
            return;
        }

        setLoading(true);
        try {
            const { token } = await signupWithEmail(createEmail, createPassword);
            localStorage.setItem("token", token);
            await api.post("/api/users/create");
            setSuccess("Account created! You can now sign in.");
            setActiveTab("login");
            setCreateEmail(""); setCreatePassword(""); setConfirmPassword("");
        } catch (err) {
            const { field, msg } = parseFirebaseError(err);
            triggerError({ [field]: msg });
        } finally {
            setLoading(false);
        }
    };

    const hasFieldError = (field) => !!errors[field];

    return (
        <div className="relative flex font-jakarta min-h-screen bg-background overflow-hidden">

            {/* Background blobs */}
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-25 animate-float-blob pointer-events-none"
                style={{ background: "radial-gradient(circle, #B9F9D6 0%, transparent 70%)" }} />
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20 animate-float-blob-slow pointer-events-none"
                style={{ background: "radial-gradient(circle, #1E5D43 0%, transparent 70%)" }} />
            <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10 animate-float-blob pointer-events-none"
                style={{ background: "radial-gradient(circle, #B9F9D6 0%, transparent 70%)", animationDelay: "3s" }} />

            {/* Left brand panel */}
            <div className="hidden lg:flex flex-col justify-between w-[440px] flex-shrink-0 relative p-12 bg-gradient-to-br from-primgreen/5 to-secgreen/10 border-r border-secgreen/20">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primgreen/70 to-secgreen/30 rounded-xl flex items-center justify-center shadow-green-glow-sm">
                        <img src={Icon} alt="logo" className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-primgreen text-xl tracking-tight">VitalityFlow</span>
                </div>

                <div className="flex flex-col gap-6 animate-slide-up">
                    <h2 className="font-extrabold text-primary text-4xl leading-tight">
                        Fuel your potential,<br />
                        <span className="text-primgreen">track your progress.</span>
                    </h2>
                    <p className="text-secondary text-sm leading-relaxed max-w-xs">
                        Your daily nutrition hub. Log meals, hit protein goals, and build unstoppable momentum — one meal at a time.
                    </p>
                    <div className="flex flex-col gap-3">
                        {[
                            { icon: <Zap className="w-4 h-4" />, text: "Real-time protein & calorie tracking" },
                            { icon: <TrendingUp className="w-4 h-4" />, text: "Smart daily goals based on your body" },
                            { icon: <Shield className="w-4 h-4" />, text: "Secure Firebase authentication" },
                        ].map((feat, i) => (
                            <div key={i} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
                                <div className="w-8 h-8 rounded-lg bg-secgreen/30 flex items-center justify-center text-primgreen flex-shrink-0">
                                    {feat.icon}
                                </div>
                                <span className="text-sm text-secondary font-medium">{feat.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-4 shadow-card animate-slide-up-2 max-w-[200px]">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-4 h-4 text-primgreen" />
                        <span className="text-xs font-bold text-primgreen bg-secgreen/30 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                    <p className="text-[11px] text-secondary/70 mb-0.5">Consistency</p>
                    <p className="font-bold text-primary text-sm">High Flow</p>
                </div>
            </div>

            {/* Right form panel */}
            <div className="flex flex-1 items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md flex flex-col gap-6 animate-slide-up">

                    {/* Mobile logo */}
                    <div className="flex lg:hidden flex-col items-center gap-2 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-primgreen to-primgreen/70 rounded-2xl flex items-center justify-center shadow-green-glow">
                            <img src={Icon} alt="logo" className="w-7 h-7" />
                        </div>
                        <h1 className="font-extrabold text-primgreen text-2xl">VitalityFlow</h1>
                        <p className="text-sm text-secondary/70 text-center">Fuel your potential, track your progress.</p>
                    </div>

                    {/* Form card — shake on error */}
                    <div
                        className="glass-card-strong rounded-2xl shadow-glass p-7 flex flex-col gap-5"
                        style={shake ? { animation: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both" } : {}}
                    >
                        {/* Tab switcher */}
                        <div className="flex rounded-xl bg-secgreen/50 p-1 gap-1">
                            {["login", "create"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); clearErrors(); setSuccess(""); }}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 capitalize
                                        ${activeTab === tab
                                            ? "bg-primgreen text-white shadow-sm"
                                            : "text-secondary hover:text-primgreen"
                                        }`}
                                >
                                    {tab === "login" ? "Sign In" : "Create Account"}
                                </button>
                            ))}
                        </div>

                        {/* Global error / success banners */}
                        {errors.general && <ErrorBanner msg={errors.general} onDismiss={clearErrors} />}
                        {success && <SuccessBanner msg={success} />}

                        {activeTab === "login" ? (
                            <>
                                <div className="flex flex-col gap-0.5">
                                    <h1 className="text-xl font-extrabold text-primary">Welcome back</h1>
                                    <p className="text-sm text-secondary/70">Please enter your details to continue.</p>
                                </div>

                                <form onSubmit={handleEmailLogin} className="flex flex-col gap-4" noValidate>
                                    {/* Email */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">Email Address</label>
                                        <IconInput
                                            icon={<Mail className={`w-4 h-4 ${hasFieldError("email") ? "text-red-400" : ""}`} />}
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); if (errors.email) clearErrors(); }}
                                            wrapperClass={hasFieldError("email") ? "border-red-400 ring-2 ring-red-200" : ""}
                                        />
                                        <FieldError msg={errors.email} />
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">Password</label>
                                        <PasswordInput
                                            icon1={<Lock className={`w-4 h-4 ${hasFieldError("password") ? "text-red-400" : ""}`} />}
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); if (errors.password) clearErrors(); }}
                                            icon2={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            onIcon2Click={() => setShowPassword(!showPassword)}
                                            wrapperClass={hasFieldError("password") ? "border-red-400 ring-2 ring-red-200" : ""}
                                        />
                                        <FieldError msg={errors.password} />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-primgreen to-primgreen/85 text-white font-semibold rounded-xl py-3 mt-1 hover:shadow-green-glow hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                Signing in...
                                            </div>
                                        ) : (
                                            <>Sign In <ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </form>

                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-secbg" />
                                    <span className="text-xs text-secondary/50 font-medium">or continue with</span>
                                    <div className="flex-1 h-px bg-secbg" />
                                </div>

                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2.5 bg-white border border-secbg/80 rounded-xl py-3 font-semibold text-sm text-primary hover:border-primgreen/40 hover:shadow-card transition-all duration-200 disabled:opacity-60"
                                >
                                    <FcGoogle className="w-5 h-5" />
                                    Continue with Google
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-0.5">
                                    <h1 className="text-xl font-extrabold text-primary">Start your journey</h1>
                                    <p className="text-sm text-secondary/70">Create your account to track, thrive and transform.</p>
                                </div>

                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2.5 bg-white border border-secbg/80 rounded-xl py-3 font-semibold text-sm text-primary hover:border-primgreen/40 hover:shadow-card transition-all duration-200 disabled:opacity-60"
                                >
                                    <FcGoogle className="w-5 h-5" />
                                    Sign up with Google
                                </button>

                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-secbg" />
                                    <span className="text-xs text-secondary/50 font-medium">or with email</span>
                                    <div className="flex-1 h-px bg-secbg" />
                                </div>

                                <form onSubmit={handleCreateAccount} className="flex flex-col gap-4" noValidate>
                                    {/* Email */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">Email Address</label>
                                        <IconInput
                                            icon={<Mail className={`w-4 h-4 ${hasFieldError("email") ? "text-red-400" : ""}`} />}
                                            type="email"
                                            placeholder="you@example.com"
                                            value={createEmail}
                                            onChange={(e) => { setCreateEmail(e.target.value); if (errors.email) clearErrors(); }}
                                            wrapperClass={hasFieldError("email") ? "border-red-400 ring-2 ring-red-200" : ""}
                                        />
                                        <FieldError msg={errors.email} />
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">Password</label>
                                        <PasswordInput
                                            icon1={<Lock className={`w-4 h-4 ${hasFieldError("password") ? "text-red-400" : ""}`} />}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={createPassword}
                                            onChange={(e) => { setCreatePassword(e.target.value); if (errors.password) clearErrors(); }}
                                            icon2={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            onIcon2Click={() => setShowPassword(!showPassword)}
                                            wrapperClass={hasFieldError("password") ? "border-red-400 ring-2 ring-red-200" : ""}
                                        />
                                        <FieldError msg={errors.password} />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold tracking-widest text-secondary/60 uppercase">Confirm Password</label>
                                        <PasswordInput
                                            icon1={<Lock className={`w-4 h-4 ${hasFieldError("confirm") ? "text-red-400" : ""}`} />}
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirm) clearErrors(); }}
                                            wrapperClass={hasFieldError("confirm") ? "border-red-400 ring-2 ring-red-200" : ""}
                                        />
                                        <FieldError msg={errors.confirm} />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primgreen to-primgreen/85 text-white font-semibold rounded-xl py-3 mt-1 hover:shadow-green-glow hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                Creating...
                                            </div>
                                        ) : (
                                            <>Create Account <ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Shake keyframe via inline style tag */}
            <style>{`
                @keyframes shake {
                    10%, 90% { transform: translateX(-2px); }
                    20%, 80% { transform: translateX(4px); }
                    30%, 50%, 70% { transform: translateX(-6px); }
                    40%, 60% { transform: translateX(6px); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}