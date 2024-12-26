import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [data, setdata] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        updatedata();
    }, [email, pass]);

    const updatedata = async () => {
        await setdata({ ...data, "email": email, "password": pass });
    };

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setemail(e.target.value);
            setdata({ ...data, "email": e.target.value });
        } else {
            setpass(e.target.value);
            setdata({ ...data, "password": e.target.value });
        }
    };

    const addtodb = async (e) => {
        e.preventDefault();
        updatedata();
        try {
            const res = await fetch("http://localhost:5000/LogIn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                console.log("Something is wrong");
                return;
            }
            const responseData = await res.json();
            localStorage.setItem("token", responseData.token);
            console.log("User logged in successfully!");
            navigate("/");
        } catch (error) {
            console.log(error || "Something Went Wrong");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Log In to Your Account
                    </h2>
                    <form className="space-y-6">
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={addtodb}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition duration-300"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don’t have an account?{" "}
                            <Link
                                to="/SignUp"
                                className="text-indigo-500 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;
