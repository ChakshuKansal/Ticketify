import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    const [LoggedIn, setLog] = useState(isLoggedIn);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setLog(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setShowNavbar(false); // Hide navbar when scrolling down
            } else {
                setShowNavbar(true); // Show navbar when scrolling up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div
            className={`bg-[#0C172F] h-16 px-5 text-zinc-200 text-lg flex items-center justify-between w-full font-sans fixed top-0 left-0 z-50 transition-transform duration-300 ${
                showNavbar ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="flex items-center gap-6">
                <div className="h-12">
                    <img
                        className="h-full"
                        src="https://static.vecteezy.com/system/resources/previews/012/027/723/original/admit-one-ticket-icon-black-and-white-isolated-wite-free-vector.jpg"
                        alt="Logo"
                    />
                </div>
                <div className="hidden md:flex gap-6">
                    <Link to={"/"} className="hover:text-white transition duration-300">
                        Home
                    </Link>
                    <Link to={"/"} className="hover:text-white transition duration-300">
                        Events
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Link
                    to={"/Admin"}
                    className="border-2 border-white rounded-full px-3 py-1 text-base hover:bg-blue-800 transition duration-300"
                >
                    List Your Event
                </Link>
                {LoggedIn ? (
                    <button
                        onClick={handleSignOut}
                        className="text-base hover:text-white transition duration-300"
                    >
                        Sign Out
                    </button>
                ) : (
                    <Link
                        to={"/SignUp"}
                        className="text-base hover:text-white transition duration-300"
                    >
                        Register
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
