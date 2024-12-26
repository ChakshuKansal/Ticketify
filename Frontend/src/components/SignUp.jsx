import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");

    const [data, setdata] = useState({
        fullname: "",
        email: "",
        password: "",    
    });

    const navigate = useNavigate();

    useEffect(() => {
        updatedata();
    }, [name, email, pass]);

    const updatedata = async () => {
        await setdata({ ...data, "email": email, "fullname": name, "password": pass });
    };

    const handleChange = (e) => {
        if (e.target.name === 'fullname') {
            setname(e.target.value);
            setdata({ ...data, "fullname": e.target.value });
        } else if (e.target.name === 'email') {
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
            const res = await fetch("http://localhost:5000/SignUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                console.log("Something is wrong");
                return;
            }
            console.log("User Registered");
            navigate("/LogIn");
        } catch (error) {
            console.log(error || "Something Went Wrong");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-teal-600">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create an Account
                    </h2>
                    <form className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none text-gray-700"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none text-gray-700"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none text-gray-700"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={addtodb}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-300"
                        >
                            Create Account
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/LogIn"
                                className="text-teal-500 hover:underline"
                            >
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
