import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreateEvent from "./CreateEvent";

const Schemes = ({ LoggedIn }) => {
  const [Addevent, Showevent] = useState(false);
  const [eventType, setEventType] = useState("Digital Event");
  const targetadder = useRef(null);

  const handleAddEvent = () => {
    setEventType("Ground Event");
    Showevent(true);
    handlescroll();
  };

  const handlescroll = () => {
    if (targetadder.current) {
      targetadder.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-10 tracking-wide">
          Get Started
        </h1>
        <p className="font-medium text-gray-600 mt-4 max-w-2xl mx-auto">
          Choose a plan to start listing your events. Our creator-friendly pricing is designed with you in mind to ensure it's easy and viable.
        </p>
      </div>

      <div className="text-center mt-10 px-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">On-ground Events</h1>
        <div className="h-auto lg:h-[540px] max-w-sm lg:w-[400px] rounded-xl overflow-hidden shadow-lg mt-10 mx-auto bg-white">
          <div className="w-full h-[100px] bg-[#31C0F0] flex justify-center items-center text-zinc-100 text-2xl font-semibold">
            <h1>REGULAR</h1>
          </div>
          <div>
            <h1 className="leading-[20px] text-xl p-10 font-bold capitalize text-center">
              STARTING FROM 10% COMMISSION
            </h1>
          </div>
          <div className="border-t border-gray-200 flex flex-col h-auto lg:h-[270px] justify-between py-8 px-6 text-lg text-left space-y-4">
            <li>Sell tickets to events happening on-ground/at a venue</li>
            <li>Specify safety measures available at the event</li>
            <li>Manage a guestlist and share updates</li>
          </div>
          <div>
            {LoggedIn ? (
              <button
                onClick={handleAddEvent}
                className="bg-[#31C0F0] p-4 rounded-md text-white text-lg w-full flex justify-center items-center"
              >
                ADD EVENT
              </button>
            ) : (
              <Link to="/SignUp">
                <button className="bg-[#31C0F0] p-4 rounded-md text-white text-lg w-full">
                  SIGN UP
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-10 px-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Digital Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mt-10">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-auto lg:h-[540px] w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg bg-white"
            >
              <div
                className={`w-full h-[100px] flex justify-center items-center text-white text-2xl font-semibold ${
                  index === 0 ? "bg-[#EC1066]" : index === 1 ? "bg-[#EC1066]" : "bg-[#EC1066]"
                }`}
              >
                <h1>{index === 0 ? "ONLINE" : index === 1 ? "LIVE STREAM" : "PRE-RECORDED"}</h1>
              </div>
              <div>
                <h1 className="leading-[20px] text-xl p-6 font-bold capitalize text-center">
                  STARTING FROM 10% COMMISSION
                </h1>
              </div>
              <div className="border-t border-gray-200 flex flex-col h-auto lg:h-[270px] justify-between py-8 px-6 text-lg text-left space-y-4">
                <li>Sell tickets to digital events</li>
                <li>Host an event on any platform of your choice</li>
                <li>Send customers details to join your event online</li>
              </div>
              <div>
                {LoggedIn ? (
                  <button
                    onClick={() => {
                      Showevent(true);
                      handlescroll();
                    }}
                    className="p-4 rounded-md text-white text-lg w-full flex justify-center items-center"
                    style={{ backgroundColor: index === 0 ? "#EC1066" : index === 1 ? "#EC1066" : "#EC1066" }}
                  >
                    ADD EVENT
                  </button>
                ) : (
                  <Link to="/SignUp">
                    <button
                      className="p-4 rounded-md text-white text-lg w-full"
                      style={{ backgroundColor: index === 0 ? "#EC1066" : index === 1 ? "#EC1066" : "#EC1066" }}
                    >
                      SIGN UP
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        {!LoggedIn && (
          <h1 className="leading-10 text-xl mt-4">
            Have an account already?{" "}
            <Link to="/Login" className="text-blue-500">
              Login
            </Link>
          </h1>
        )}
      </div>

      <div ref={targetadder}>
        {Addevent && <CreateEvent showevent={Showevent} eventType={eventType} />}
      </div>
    </div>
  );
};

export default Schemes;
