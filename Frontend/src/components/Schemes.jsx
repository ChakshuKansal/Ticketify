import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreateEvent from "./CreateEvent";

const Schemes = ({ LoggedIn }) => {
  const [Addevent, Showevent] = useState(false);
  const [eventType, setEventType] = useState('Digital Event');
  const targetadder = useRef(null);
  const handleAddEvent = () => {
    setEventType("Ground Event");
    Showevent(true);
    handlescroll();
  };

  const handlescroll=()=>{
    if (targetadder.current) {
      targetadder.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-gray-800 leading-10 tracking-wide">
          Get Started
        </h1>
        <p className="font-medium text-gray-600 mt-4 max-w-2xl mx-auto">
          Choose a plan to start listing your events. Our creator-friendly pricing is designed with you in mind to ensure it's easy and viable.
        </p>
      </div>
      
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">On-ground Events</h1>
        <div className="h-[540px] w-[400px] rounded-xl overflow-hidden shadow-lg mt-10 mx-auto">
          <div className="w-full h-[100px] bg-[#31C0F0] flex justify-center items-center text-zinc-100 text-2xl font-semibold">
            <h1>REGULAR</h1>
          </div>
          <div>
            <h1 className="leading-[20px] text-xl p-10 font-bold capitalize">
              STARTING FROM 10% COMMISSION
            </h1>
          </div>
          <div className="border-t border-zinc-950 flex flex-col h-[270px] justify-between py-16 text-lg px-10 text-left">
            <li>Sell tickets to events happening on-ground/at a venue</li>
            <li>Specify safety measures available at the event</li>
            <li>Manage a guestlist and share updates</li>
          </div>
          <div>
            {LoggedIn ? (
              <button onClick={handleAddEvent} className="bg-[#31C0F0] p-4 rounded-md text-zinc-50 text-lg w-full flex justify-center items-center">
                ADD EVENT
              </button>
            ) : (
              <Link to="/SignUp">
                <button className="bg-[#31C0F0] p-4 h-[50px] rounded-md text-zinc-50 text-lg w-full">
                  <div >
                    SIGN UP
                  </div>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Digital Events</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-20 px-10 mt-10">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-[540px] w-[380px] rounded-xl overflow-hidden shadow-lg">
              <div className="w-full h-[100px] bg-[#EC1066] flex justify-center items-center text-zinc-100 text-2xl font-semibold">
                <h1>{index === 0 ? 'ONLINE' : index === 1 ? 'LIVE STREAM' : 'PRE-RECORDED'}</h1>
              </div>
              <div>
                <h1 className="leading-[20px] text-xl p-10 font-bold capitalize">
                  STARTING FROM 10% COMMISSION
                </h1>
              </div>
              <div className="border-t border-zinc-950 flex flex-col h-[270px] justify-between py-16 text-lg px-5 text-left">
                <li>Sell tickets to digital events</li>
                <li>Host an event on any platform of your choice</li>
                <li>Send customers details to join your event online</li>
              </div>
              <div>
                {LoggedIn ? (
                  <button onClick={() => {Showevent(true);handlescroll()}} className="bg-[#EC1066] p-4 h-[50px] rounded-md text-zinc-50 text-lg w-full flex text-center items-center justify-center">
                    <div>
                      ADD EVENT
                    </div>
                  </button>
                ) : (
                  <Link to="/SignUp">
                    <button className="bg-[#EC1066] p-4 rounded-md text-zinc-50 text-lg w-full text-center">
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
