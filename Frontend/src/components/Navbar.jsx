import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token }) => {
    const [LoggedIn, setLog] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setLog(false);
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            setLog(true);
        } else {
            setLog(false);
        }
    }, [token]);

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
        <>

            <div className={`bg-[#0C172F] h-16 px-5 text-zinc-200 text-lg flex items-center fixed justify-between w-full font-sans top-0 left-0 z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="relative flex items-center gap-4">
                    <Link to="/" className="h-12">
                        <img
                            className="h-full relative z-50"
                            src="https://tse2.mm.bing.net/th?id=OIG4.Aw_64FWXLdDdHeDcqMZh&pid=ImgGn"
                            alt="Logo"
                        />
                    </Link>
                    <span className="text-xl font-bold hidden md:block relative z-50">
                        Ticketify
                    </span>
                </div>

                <button 
                    className={`text-white text-2xl md:hidden relative z-50 transition-all duration-300 ease-in-out`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                <div 
  className={`flex flex-col md:flex-row items-center gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-[#0C172F] md:bg-transparent z-40 transition-all duration-300 ease-in-out ${isMenuOpen ? "sm:translate-y-0  sm:opacity-100" : "-translate-y-full opacity-0"} md:opacity-100 md:translate-y-0`}
>                    <Link to={"/"} className="hover:text-white transition duration-300 py-2 md:py-0">
                        Home
                    </Link>
                    <Link to={"/"} className="hover:text-white transition duration-300 py-2 md:py-0">
                        Events
                    </Link>
                    <Link 
                        to="/Admin" 
                        className="border-2 border-white rounded-full px-3 py-1 text-base hover:bg-blue-800 transition duration-300 flex items-center"
                    >
                        List Your Event
                    </Link>
                    {LoggedIn ? (
                        <>
                            <Link
                                to="/profile"
                                className="text-base hover:text-white transition duration-300 flex items-center py-2 md:py-0"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="user-circle"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-6 h-6 text-white mr-2"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-53 0-96-43-96-96 0-52.9 42.9-96 96-96s96 43 96 96c0 53-43 96-96 96zm0-240c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"
                                    ></path>
                                </svg>
                                Profile
                            </Link>
                            <button
                                type="submit"
                                className="flex items-center gap-2 flat inverted margin-bottom-0 primary px-3 py-1 text-base"
                                onClick={handleSignOut}
                            >
                                Sign Out
                                <span className="margin-left-2xs">
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-right-from-bracket"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className="w-5 h-5 text-white"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                                        ></path>
                                    </svg>
                                </span>
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/SignUp" 
                            className="text-base hover:text-white transition duration-300 py-2 md:py-0"
                        >
                            Register 
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
