import { IconInput, PasswordInput } from "../components/IconInput"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, loginWithEmail } from "../services/authService";
import Icon from "../assets/Icon.png";
import { Lock, Mail, ArrowRight, User, Eye, EyeOff, BarChart2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signupWithEmail} from "../services/authService";   
import api from "../services/api"; 

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    // Added states for the Create Account form
    const [createName, setCreateName] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [activeTab, setActiveTab] = useState("login");
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const { user, token } = await loginWithGoogle();
            localStorage.setItem("token", token);
            console.log("User:", user);
            navigate("/dashboard");
        } catch (err) {
            console.error("Google login failed", err.message);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const { token } = await loginWithEmail(email, password);
            localStorage.setItem("token", token);
            await api.post("/api/users/create")
            navigate("/dashboard");
        } catch (err) {
            console.error("Email login failed", err.message);
        }
    };

const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (createPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // 1. Create user in Firebase
        const { token } = await signupWithEmail(createEmail, createPassword);

        // 2. Store token
        localStorage.setItem("token", token);

        // 3. Send token to backend → create user in DB
        await api.post("/api/users/create");

        // 4. Redirect
        navigate("/dashboard");

    } catch (err) {
        console.error("Signup failed:", err.message);
    }
};
    return (
        <div className="flex font-jakarta items-center justify-center bg-background min-h-screen">
            <div className="flex flex-col w-full max-w-md p-6 items-center justify-center py-6 gap-4">
                
                {/* Header */}
                <div className="flex flex-col justify-center items-center gap-2 p-6">
                    <img src={Icon} alt="logo" className="w-12 h-12" />
                    <h1 className="font-bold font-jakarta text-primary text-center text-2xl">VitalityFlow</h1>
                    <p className="text-center text-secondary text-sm">Fuel your potential, track your progress.</p>
                </div>

                <div className="flex bg-white drop-shadow-md w-full max-w-md p-6 flex-col rounded-2xl gap-4">

                    {/* Toggle */}
                    <div className="w-full flex items-center rounded-3xl justify-around border-2 border-primgreen my-2 ">
                        <button 
                            onClick={() => setActiveTab("login")}
                            className={`flex w-full py-3 items-center justify-center font-semibold rounded-2xl transition-colors duration-200 ${
                                activeTab === 'login' ? 'bg-primgreen text-white' : 'bg-transparent text-primgreen'
                            }`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setActiveTab("create")}
                            className={`flex w-full py-3 items-center justify-center font-semibold rounded-2xl transition-colors duration-200 ${
                                activeTab === 'create' ? 'bg-primgreen text-white' : 'bg-transparent text-primgreen'
                            }`}
                        >
                            Create
                        </button>
                    </div>

                    {/* Content Section */}
                    {activeTab === 'login' ? (
                        <>
                            <section className="flex flex-col items-start text-primary gap-2">
                                <h1 className="text-2xl font-semibold">Welcome back</h1>
                                <p className="text-sm text-secondary">Please enter your details to continue.</p>
                            </section>

                            <form onSubmit={handleEmailLogin} className="flex flex-col justify-center gap-2 mt-6">
                                <label className="flex items-start text-secondary text-sm font-semibold">EMAIL ADDRESS</label>
                                <IconInput 
                                    icon={<Mail className="w-5 h-5"/>} 
                                    type="email" 
                                    placeholder="abcd@example.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="text-left text-secondary text-sm font-semibold mt-2">PASSWORD</label>
                                <PasswordInput 
                                    icon1={<Lock className="w-5 h-5"/>} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    icon2={showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                    onIcon2Click={() => setShowPassword(!showPassword)}
                                />

                                <button type="submit" className="w-full flex justify-center hover:scale-[1.02] transition-transform duration-200 items-center gap-2 bg-primgreen text-white font-semibold rounded-3xl py-3 mt-4">
                                    Login
                                    <ArrowRight className="w-5 h-5 font-bold"/>
                                </button>
                            </form>

                            <div className="flex justify-center items-center flex-row gap-4">
                                <div className="w-full h-[1px] bg-secbg"></div>
                                <div className="text-secondary text-center text-sm py-4">OR</div>
                                <div className="w-full h-[1px] bg-secbg"></div>
                            </div>

                            <button onClick={handleGoogleLogin} type="button" className="bg-white shadow-md hover:scale-[1.02] w-full rounded-3xl flex items-center justify-center py-3 hover:bg-primgreen hover:text-white transition-colors duration-200">
                                <FcGoogle className="w-5 h-5 mr-2" />
                                Log in with Google
                            </button>
                        </>
                    ) : (
                        <>
                            <section className="flex flex-col items-start text-primary gap-2">
                                <h1 className="text-2xl font-semibold">Start your Journey</h1>
                                <p className="text-sm text-secondary">Create your account to track, thrive and transform.</p>
                            </section>

                            <button onClick={handleGoogleLogin} type="button" className="bg-white shadow-md font-semibold hover:scale-[1.02] w-full rounded-3xl flex items-center justify-center py-3 my-4 hover:bg-primgreen hover:text-white transition-all duration-200">
                                <FcGoogle className="w-5 h-5 mr-2" />
                                Sign in with Google
                            </button>

                            <div className="flex justify-center items-center flex-row gap-4">
                                <div className="w-full h-[1px] bg-secbg"></div>
                                <div className="text-secondary text-center text-sm py-4">OR</div>
                                <div className="w-full h-[1px] bg-secbg"></div>
                            </div>

                            <form onSubmit={handleCreateAccount} className="flex flex-col justify-center gap-2 mt-4">
                                <label className="flex items-start text-secondary text-sm font-semibold">NAME</label>
                                <IconInput 
                                    icon={<User className="w-5 h-5"/>} 
                                    type="text" 
                                    placeholder="Foody"
                                    value={createName}
                                    onChange={(e) => setCreateName(e.target.value)}
                                />

                                <label className="flex items-start text-secondary text-sm font-semibold mt-2">EMAIL ADDRESS</label>
                                <IconInput 
                                    icon={<Mail className="w-5 h-5"/>} 
                                    type="email" 
                                    placeholder="abcd@example.com"
                                    value={createEmail}
                                    onChange={(e) => setCreateEmail(e.target.value)}
                                />

                                <label className="text-left text-secondary text-sm font-semibold mt-2">PASSWORD</label>
                                <PasswordInput 
                                    icon1={<Lock className="w-5 h-5"/>} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••"
                                    value={createPassword}
                                    onChange={(e) => setCreatePassword(e.target.value)}
                                    icon2={showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                    onIcon2Click={() => setShowPassword(!showPassword)}
                                />

                                <label className="text-left text-secondary text-sm font-semibold mt-2">CONFIRM PASSWORD</label>
                                <PasswordInput 
                                    icon1={<Lock className="w-5 h-5"/>} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primgreen text-white font-semibold rounded-3xl py-3 mt-4 hover:scale-[1.02] transition-transform duration-200">
                                    Create Account
                                    <ArrowRight className="w-5 h-5 font-bold"/>
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* card section */}
            <div className="lg:flex flex-col justify-around fixed hidden bottom-20 -rotate-12 rounded-2xl left-10 w-40 p-4 bg-white shadow-md">
                    <div className="flex flex-row gap-20 justify-around">
                        <BarChart2 className="flex  w-4 h-4 text-primgreen font-semibold"/>
                        <span className="flex text-[12px] font-semibold text-primgreen">+12%</span>
                    </div>
                    <span className="text-[12px] text-secondary flex items-start mb-2">Consistency</span>
                    <span className="font-semibold flex items-start">High Flow</span>
            </div>
        </div>
    );
}