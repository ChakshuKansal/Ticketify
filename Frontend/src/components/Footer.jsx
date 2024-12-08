import React, { useState } from "react";
const Footer = () => {
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLetter(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "Email already exists") {
          setError("You are already a member.");
        } else {
          setError("Failed to subscribe. Please try again later.");
        }
        return;
      }
      alert("Thank you for subscribing!");
      setLetter("");
      return;
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-6 bg-gray-50 border-t-2 border-gray-200">
        <div className="rounded-lg bg-white shadow-md p-6 lg:p-10 max-w-full lg:max-w-[750px] text-center">
          <div className="mb-4 flex justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_6375_7"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="32"
                height="32"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.66671 6.00008C6.13627 6.00008 5.62757 6.2108 5.25249 6.58587C4.87742 6.96094 4.66671 7.46965 4.66671 8.00008V24.0001C4.66671 24.5305 4.87742 25.0392 5.25249 25.4143C5.62757 25.7894 6.13627 26.0001 6.66671 26.0001H22.6667C22.2365 25.4265 22 24.7255 22 24.0001V8.00008C22 7.46965 21.7893 6.96094 21.4143 6.58587C21.0392 6.21079 20.5305 6.00008 20 6.00008H6.66671ZM6.66671 4.66675C5.78265 4.66675 4.93481 5.01794 4.30968 5.64306C3.68456 6.26818 3.33337 7.11603 3.33337 8.00008V24.0001C3.33337 24.8841 3.68456 25.732 4.30968 26.3571C4.93481 26.9822 5.78265 27.3334 6.66671 27.3334H25.3334C26.2174 27.3334 27.0653 26.9822 27.6904 26.3571C28.3155 25.732 28.6667 24.8841 28.6667 24.0001V12.0001C28.6667 11.116 28.3155 10.2682 27.6904 9.64306C27.0653 9.01794 26.2174 8.66675 25.3334 8.66675H23.3334V8.00008C23.3334 7.11603 22.9822 6.26818 22.3571 5.64306C21.7319 5.01794 20.8841 4.66675 20 4.66675H6.66671ZM23.3334 10.0001V24.0001C23.3334 24.5305 23.5441 25.0392 23.9192 25.4143C24.2942 25.7894 24.8029 26.0001 25.3334 26.0001C25.8638 26.0001 26.3725 25.7894 26.7476 25.4143C27.1227 25.0392 27.3334 24.5305 27.3334 24.0001V12.0001C27.3334 11.4696 27.1227 10.9609 26.7476 10.5859C26.3725 10.2108 25.8638 10.0001 25.3334 10.0001H23.3334ZM8.66671 10.6667C8.66671 10.2986 8.96518 10.0001 9.33337 10.0001H17.3334C17.7016 10.0001 18 10.2986 18 10.6667V16.0001C18 16.3683 17.7016 16.6667 17.3334 16.6667H9.33337C8.96518 16.6667 8.66671 16.3683 8.66671 16.0001V10.6667ZM10 11.3334V15.3334H16.6667V11.3334H10ZM8.66671 21.3334C8.66671 20.9652 8.96518 20.6667 9.33337 20.6667H17.3334C17.7016 20.6667 18 20.9652 18 21.3334C18 21.7016 17.7016 22.0001 17.3334 22.0001H9.33337C8.96518 22.0001 8.66671 21.7016 8.66671 21.3334Z"
                  fill="#FF5733"
                ></path>
              </mask>
              <g mask="url(#mask0_6375_7)">
                <rect width="32" height="32" fill="#FF5733"></rect>
              </g>
            </svg>
          </div>
          <h2 className="font-sans text-xl lg:text-2xl font-bold mb-2">
            Subscribe To Our Newsletter!
          </h2>
          <p className="text-sm lg:text-base mb-4">
            Stay updated with live music, festivals, and events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              className="h-10 sm:h-12 w-full sm:w-64 border rounded-lg px-4"
              type="email"
              placeholder="Enter your email"
              value={letter}
              disabled={loading}
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-lg w-full sm:w-auto"
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-500 text-sm">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 lg:px-20 py-6 text-sm text-gray-700 lg:text-lg">
        <p className="mb-4 text-sm lg:text-lg">
          Ticketify aims to give you experiences in Online worth your time and
          money. Explore live events (music, comedy, theater, art); dining
          experiences; weekend getaways, and more.
        </p>
        <p className="mb-4 text-sm lg:text-lg">
          <strong>Curated Music Events:</strong> Catch live performances of top
          artists such as Arijit Singh, Shreya Ghoshal, or international bands.
        </p>
        <p className="mb-4">
          <strong>Curated & Handpicked Events in Online:</strong> aims to give you experiences in Online worth your time and money, and hopefully, encourage you to try something new. 
        </p>
        <p className="mb-4">
          <strong>For event organizers</strong>  we sure know what goes into putting together a great experience. Our technology, marketing and customer support can help you build a community of not just ticket buyers, but also fans.
        </p>
        <div className="text-center text-gray-500 border-t-2 pt-4 mt-6">
          2024 © Ticketify™ Ltd. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
