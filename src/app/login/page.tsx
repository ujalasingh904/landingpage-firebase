'use client';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseconfig";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa"

const Form = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                sessionStorage.setItem("user", JSON.stringify(auth.currentUser));
                console.log("User signed in");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                sessionStorage.setItem("user", JSON.stringify(auth.currentUser));
                console.log("User registered");
            }
            router.push("/");
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {

            await signInWithPopup(auth, googleProvider);
            sessionStorage.setItem("user", JSON.stringify(auth.currentUser));
            console.log("Google sign-in successful");
            router.push("/");
        } catch (err : any) {
            console.error(err);
            setError(err.message);
        }
    };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-700">

            <form
                onSubmit={handleEmailSignIn}
                className="form w-full max-w-md m-auto p-6   shadow-2xl rounded-lg bg-white"
            >
                {!isLogin && (
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-semibold mb-2">Name</label>
                        <div className="flex items-center border-b   py-2">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input w-full outline-none text-gray-700"
                                placeholder="Enter your Name"
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold mb-2">Email</label>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full outline-none text-gray-700"
                            placeholder="Enter your Email"
                        />
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold mb-2">Password</label>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input w-full outline-none text-gray-700"
                            placeholder="Enter your Password"
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {isLogin ? "Sign In" : "Register"}
                </button>

                <p className="mt-6 text-center text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? " Sign Up" : " Sign In"}
                    </span>
                </p>

                <p className="mt-6 text-center text-gray-500">Or sign in with</p>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition duration-300 mr-2"
                    >
                        <FaGoogle className="mr-2" />
                        Sign In with Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
