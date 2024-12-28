import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Caraousel from "./Caraousel";
import Footer from "./Footer";

const Home = () => {
  const Genres = [
    {
      id: 1,
      imageurl:
        "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_320/c_crop%2Cg_custom%2Fv1625122458%2Fzi16tkrn0qqs84d92hah.png",
    },
    {
      id: 2,
      imageurl:
        "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_320/c_crop%2Cg_custom%2Fv1623313209%2Fwjapklp7hrnalamjkvad.png",
    },
    {
      id: 3,
      imageurl:
        "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_320/c_crop%2Cg_custom%2Fv1688562270%2Fr7dgxr1e5dawmjyuvujl.png",
    },
    {
      id: 4,
      imageurl:
        "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_320/c_crop%2Cg_custom%2Fv1671187157%2Fz8nydm5tr0wtrtvwzyrq.png",
    },
    {
      id: 5,
      imageurl:
        "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_320/c_crop%2Cg_custom%2Fv1671187953%2Fputphvcf3eqajqcrchn8.png",
    },
  ];

  const [events, setEvents] = useState([]);
  const [genreCounts, setGenreCounts] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetchEvents();
  })

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  },)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }

    const interval = setInterval(() => {
      authenticateToken();
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  const authenticateToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const result = await response.json();
        if (!result.valid) {
          throw new Error('Invalid token');
        }
        console.log('User is authenticated');
      } else {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      setToken(-1);
    }
  };


  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/Events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
      calculateGenreCounts(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const calculateGenreCounts = (events) => {
    const counts = events.reduce((acc, event) => {
      const genre = event.eventCat;
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
    setGenreCounts(counts);
  };

  const categorizedEvents = events.reduce((acc, event) => {
    const category = event.eventCat || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(event);
    return acc;
  }, {});

  const handleBookTicket = async (eventId) => {
    try {
      console.log(eventId)
      const res = await fetch('http://localhost:5000/book-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: eventId }),
      });

      if (res.ok) {
        const result = await res.json();
        alert('Ticket booked successfully!');
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to book the ticket. Please try again.');
      }
    } catch (err) {
      console.error('Error booking ticket:', err);
      alert('An error occurred. Please try again later.');
    }
  };


  return (
    <>
      <div className="h-full">
        <Navbar token={token} />
        <Caraousel />
        <div className="">
          <div className="mx-5 flex justify-center items-center sm:justify-start sm:items-start flex-col">
            <div className="flex flex-col w-[210px] mb-10 text-center h-36 justify-between sm:w-[320px] sm:mb-2 sm:text-left sm:flex-row">
              <div className="flex justify-center items-center h-full">
                <svg
                  width="52"
                  height="63"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.889 11.4756C18.889 9.87531 17.6006 8.56893 16.0001 8.56893C14.3996 8.56893 13.1112 9.87531 13.1112 11.4756C13.1112 13.0759 14.3996 14.3823 16.0001 14.3823C17.6006 14.3823 18.889 13.0759 18.889 11.4756ZM16.0001 9.90226C16.8542 9.90226 17.5557 10.6016 17.5557 11.4756C17.5557 12.3495 16.8542 13.0489 16.0001 13.0489C15.146 13.0489 14.4446 12.3495 14.4446 11.4756C14.4446 10.6016 15.146 9.90226 16.0001 9.90226Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 4.75562C19.0303 4.75562 22.6667 7.04133 22.6667 11.0413C22.6667 15.6393 18.3503 19.1273 16.6639 20.3147C16.2612 20.5982 15.7388 20.5982 15.3361 20.3147C13.6497 19.1273 9.33333 15.6393 9.33333 11.0413C9.33333 7.04133 12.9697 4.75562 16 4.75562ZM16 6.08895C18.5341 6.08895 21.3333 7.99689 21.3333 11.0413C21.3333 12.9166 20.4498 14.6483 19.2609 16.1186C18.1286 17.5189 16.8042 18.5752 16 19.1508C15.1958 18.5752 13.8714 17.5189 12.7391 16.1186C11.5502 14.6483 10.6667 12.9166 10.6667 11.0413C10.6667 7.99689 13.4659 6.08895 16 6.08895Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M12.6667 19.4223C13.0349 19.4223 13.3333 19.7208 13.3333 20.0889C13.3333 20.4571 13.0349 20.7556 12.6667 20.7556H11.1667C10.7985 20.7556 10.5 20.4571 10.5 20.0889C10.5 19.7208 10.7985 19.4223 11.1667 19.4223H12.6667Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M8.16667 19.4223C8.53485 19.4223 8.83333 19.7208 8.83333 20.0889C8.83333 20.4571 8.53485 20.7556 8.16667 20.7556H6.66667C6.48465 20.7556 6.31274 20.7917 6.15646 20.8565C5.81635 20.9976 5.42631 20.8362 5.28527 20.4961C5.14424 20.156 5.30561 19.7659 5.64572 19.6249C5.96107 19.4941 6.30632 19.4223 6.66667 19.4223H8.16667Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M4.20261 21.068C4.34365 20.7279 4.73369 20.5665 5.0738 20.7076C5.4139 20.8486 5.57528 21.2386 5.43424 21.5787C5.36943 21.735 5.33333 21.9069 5.33333 22.0889C5.33333 22.271 5.36943 22.4429 5.43424 22.5992C5.57528 22.9393 5.4139 23.3293 5.0738 23.4703C4.73369 23.6114 4.34365 23.45 4.20261 23.1099C4.07184 22.7945 4 22.4493 4 22.0889C4 21.7286 4.07184 21.3834 4.20261 21.068Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M5.64572 24.553C5.30561 24.412 5.14424 24.0219 5.28527 23.6818C5.42631 23.3417 5.81635 23.1803 6.15646 23.3214C6.31274 23.3862 6.48465 23.4223 6.66667 23.4223H7.83333C8.20152 23.4223 8.5 23.7208 8.5 24.0889C8.5 24.4571 8.20152 24.7556 7.83333 24.7556H6.66667C6.30632 24.7556 5.96107 24.6838 5.64572 24.553Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M25.3333 23.4223C25.6937 23.4223 26.0389 23.4941 26.3543 23.6249C26.6944 23.7659 26.8558 24.156 26.7147 24.4961C26.5737 24.8362 26.1836 24.9976 25.8435 24.8565C25.6873 24.7917 25.5154 24.7556 25.3333 24.7556H24.1667C23.7985 24.7556 23.5 24.4571 23.5 24.0889C23.5 23.7208 23.7985 23.4223 24.1667 23.4223H25.3333Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M21.8333 23.4223C22.2015 23.4223 22.5 23.7208 22.5 24.0889C22.5 24.4571 22.2015 24.7556 21.8333 24.7556H19.5C19.1318 24.7556 18.8333 24.4571 18.8333 24.0889C18.8333 23.7208 19.1318 23.4223 19.5 23.4223H21.8333Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M17.1667 23.4223C17.5349 23.4223 17.8333 23.7208 17.8333 24.0889C17.8333 24.4571 17.5349 24.7556 17.1667 24.7556H14.8333C14.4651 24.7556 14.1667 24.4571 14.1667 24.0889C14.1667 23.7208 14.4651 23.4223 14.8333 23.4223H17.1667Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M12.5 23.4223C12.8682 23.4223 13.1667 23.7208 13.1667 24.0889C13.1667 24.4571 12.8682 24.7556 12.5 24.7556H10.1667C9.79848 24.7556 9.5 24.4571 9.5 24.0889C9.5 23.7208 9.79848 23.4223 10.1667 23.4223H12.5Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M26.5658 25.5787C26.4247 25.2386 26.5861 24.8486 26.9262 24.7076C27.2663 24.5665 27.6564 24.7279 27.7974 25.068C27.9282 25.3834 28 25.7286 28 26.0889C28 26.4493 27.9282 26.7945 27.7974 27.1099C27.6564 27.45 27.2663 27.6114 26.9262 27.4703C26.5861 27.3293 26.4247 26.9393 26.5658 26.5992C26.6306 26.4429 26.6667 26.271 26.6667 26.0889C26.6667 25.9069 26.6306 25.735 26.5658 25.5787Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M25.8435 27.3214C26.1836 27.1803 26.5737 27.3417 26.7147 27.6818C26.8558 28.0219 26.6944 28.412 26.3543 28.553C26.0389 28.6838 25.6937 28.7556 25.3333 28.7556H24.0417C23.6735 28.7556 23.375 28.4571 23.375 28.0889C23.375 27.7208 23.6735 27.4223 24.0417 27.4223H25.3333C25.5153 27.4223 25.6873 27.3862 25.8435 27.3214Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M21.4583 27.4223C21.8265 27.4223 22.125 27.7208 22.125 28.0889C22.125 28.4571 21.8265 28.7556 21.4583 28.7556H18.875C18.5068 28.7556 18.2083 28.4571 18.2083 28.0889C18.2083 27.7208 18.5068 27.4223 18.875 27.4223H21.4583Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M16.2917 27.4223C16.6599 27.4223 16.9583 27.7208 16.9583 28.0889C16.9583 28.4571 16.6599 28.7556 16.2917 28.7556H13.7083C13.3401 28.7556 13.0417 28.4571 13.0417 28.0889C13.0417 27.7208 13.3401 27.4223 13.7083 27.4223H16.2917Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M11.125 27.4223C11.4932 27.4223 11.7917 27.7208 11.7917 28.0889C11.7917 28.4571 11.4932 28.7556 11.125 28.7556H8.54167C8.17348 28.7556 7.875 28.4571 7.875 28.0889C7.875 27.7208 8.17348 27.4223 8.54167 27.4223H11.125Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M5.95833 27.4223C6.32652 27.4223 6.625 27.7208 6.625 28.0889C6.625 28.4571 6.32652 28.7556 5.95833 28.7556H4.66667C4.29848 28.7556 4 28.4571 4 28.0889C4 27.7208 4.29848 27.4223 4.66667 27.4223H5.95833Z"
                    fill="#0C172F"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col font-semibold justify-center">
                <h1 className="font-bold tracking-tighter ">
                  NEW EXPERIENCE
                </h1>
                <h2>Explore, Discover, Make a Plan</h2>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-5 md:grid-cols-3 sm:gap-6 mx-2">
              {Genres.map((genre, index) => (
                <div key={index} id={genre.id} className="w-full h-[200px] flex justify-center items-center">
                  <img src={genre.imageurl} alt={`${genre.name} image`} />
                </div>
              ))}
            </div>
          </div>

          <section className="mx-5 flex justify-center items-center sm:justify-start sm:items-start flex-col">
            <div className="flex flex-col sm:flex-row h-36 p-4 lg:text-2xl justify-between max-w-[340px] flex-wrap sm:text-xl ">
              <div className="flex items-center justify-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="-8 -7 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.33333 4.75562C5.49238 4.75562 4 6.248 4 8.08895V12.7556C4 14.5966 5.49238 16.0889 7.33333 16.0889H12C13.8409 16.0889 15.3333 14.5966 15.3333 12.7556V8.08895C15.3333 6.248 13.841 4.75562 12 4.75562H7.33333ZM5.33333 8.08895C5.33333 6.98438 6.22876 6.08895 7.33333 6.08895H12C13.1046 6.08895 14 6.98438 14 8.08895V12.7556C14 13.8602 13.1046 14.7556 12 14.7556H7.33333C6.22876 14.7556 5.33333 13.8602 5.33333 12.7556V8.08895Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M5.33333 20.7556C5.33333 19.651 6.22876 18.7556 7.33333 18.7556H11.3333C11.7015 18.7556 12 18.4571 12 18.0889C12 17.7208 11.7015 17.4223 11.3333 17.4223H7.33333C5.49238 17.4223 4 18.9147 4 20.7556V25.4223C4 27.2632 5.49238 28.7556 7.33333 28.7556H12C13.8409 28.7556 15.3333 27.2632 15.3333 25.4223V18.0889C15.3333 17.7208 15.0349 17.4223 14.6667 17.4223C14.2985 17.4223 14 17.7208 14 18.0889V25.4223C14 26.5269 13.1046 27.4223 12 27.4223H7.33333C6.22876 27.4223 5.33333 26.5269 5.33333 25.4223V20.7556Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    d="M18 15.4223V8.08895C18 6.98438 18.8954 6.08895 20 6.08895L24.6667 6.08895C25.7712 6.08895 26.6667 6.98438 26.6667 8.08895V12.7556C26.6667 13.8602 25.7712 14.7556 24.6667 14.7556H20.6667C20.2985 14.7556 20 15.0541 20 15.4223C20 15.7905 20.2985 16.0889 20.6667 16.0889H24.6667C26.5076 16.0889 28 14.5966 28 12.7556V8.08895C28 6.248 26.5076 4.75562 24.6667 4.75562H20C18.1591 4.75562 16.6667 6.248 16.6667 8.08895V15.4223C16.6667 15.7905 16.9651 16.0889 17.3333 16.0889C17.7015 16.0889 18 15.7905 18 15.4223Z"
                    fill="#0C172F"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 17.4223C18.1591 17.4223 16.6667 18.9147 16.6667 20.7556V25.4223C16.6667 27.2632 18.1591 28.7556 20 28.7556H24.6667C26.5076 28.7556 28 27.2632 28 25.4223V20.7556C28 18.9147 26.5076 17.4223 24.6667 17.4223H20ZM18 20.7556C18 19.651 18.8954 18.7556 20 18.7556H24.6667C25.7712 18.7556 26.6667 19.651 26.6667 20.7556V25.4223C26.6667 26.5269 25.7712 27.4223 24.6667 27.4223H20C18.8954 27.4223 18 26.5269 18 25.4223V20.7556Z"
                    fill="#0C172F"
                  ></path>
                </svg>
              </div>
              <div className="flex font-semibold justify-center items-center">
                <h1 className="font-bold text-left tracking-tighter">
                  Browse events by genre
                </h1>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-3 mx-16 gap-10">
              <li className="flex flex-col items-center space-y-2">
                <li className="flex flex-col items-center p-4 rounded-lg shadow hover:shadow-lg transition-all" onClick={() => {
                  const section = document.getElementById("category-Workshop");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 45 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27 10C26.4477 10 26 10.4477 26 11C26 11.5523 26.4477 12 27 12H33.2609C33.8132 12 34.2609 11.5523 34.2609 11C34.2609 10.4477 33.8132 10 33.2609 10H27Z"
                        fill="#0C172F"
                      ></path>
                      <path
                        d="M26 15C26 14.4477 26.4477 14 27 14H35C35.5523 14 36 14.4477 36 15C36 15.5523 35.5523 16 35 16H27C26.4477 16 26 15.5523 26 15Z"
                        fill="#0C172F"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16ZM16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20Z"
                        fill="#0C172F"
                      ></path>
                      <path
                        d="M10 29C10 25.6863 12.6863 23 16 23C18.9445 23 21.3937 25.1211 21.9028 27.9187C24.2333 27.4937 26 25.4532 26 23C26 22.4477 26.4477 22 27 22C27.5523 22 28 22.4477 28 23C28 26.866 24.866 30 21 30C20.4477 30 20 29.5523 20 29C20 26.7909 18.2091 25 16 25C13.7909 25 12 26.7909 12 29C12 29.5523 11.5523 30 11 30C10.4477 30 10 29.5523 10 29Z"
                        fill="#0C172F"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.6511 6C7.62342 6 6 7.6481 6 9.67247V30.3275C6 32.3519 7.62342 34 9.6511 34H38.3489C40.3766 34 42 32.3519 42 30.3275V9.67247C42 7.6481 40.3766 6 38.3489 6H9.6511ZM8 9.67247C8 8.7375 8.7431 8 9.6511 8H38.3489C39.2569 8 40 8.7375 40 9.67247V30.3275C40 31.2625 39.2569 32 38.3489 32H9.6511C8.7431 32 8 31.2625 8 30.3275V9.67247Z"
                        fill="#0C172F"
                      ></path>
                      <path
                        d="M11 42L37 42C37.5523 42 38 41.5523 38 41C38 40.4477 37.5523 40 37 40H33.0026L33 40H31C30.4477 40 30 39.5523 30 39V37C30 36.4477 29.5523 36 29 36C28.4477 36 28 36.4477 28 37V39C28 39.5523 27.5523 40 27 40H21C20.4477 40 20 39.5523 20 39V37C20 36.4477 19.5523 36 19 36C18.4477 36 18 36.4477 18 37V39C18 39.5523 17.5523 40 17 40H11C10.4477 40 10 40.4477 10 41C10 41.5523 10.4477 42 11 42Z"
                        fill="#0C172F"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col text-center ">
                    <div className="text-sm font-medium">Workshops</div>
                    <div className="text-xs text-gray-500">{genreCounts["Workshops"] || 0} Events</div>
                  </div>
                </li>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <li className="flex flex-col items-center p-4 rounded-lg shadow hover:shadow-lg transition-all" onClick={() => {
                  const section = document.getElementById("category-Music");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 45 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M40 8.99999C40 8.70347 39.8684 8.42224 39.6407 8.23224C39.4131 8.04224 39.1129 7.96308 38.8211 8.01612L16.8211 12.0161C16.3456 12.1026 16 12.5167 16 13V30.9996C15.1643 30.3719 14.1256 30 13 30C10.2386 30 8 32.2386 8 35C8 37.7614 10.2386 40 13 40C15.7614 40 18 37.7614 18 35V19.8346L38 16.1982V26.9996C37.1643 26.3719 36.1256 26 35 26C32.2386 26 30 28.2386 30 31C30 33.7614 32.2386 36 35 36C37.7614 36 40 33.7614 40 31V8.99999ZM38 14.1655V10.1982L18 13.8346V17.8018L38 14.1655ZM13 38C14.6569 38 16 36.6569 16 35C16 33.3431 14.6569 32 13 32C11.3431 32 10 33.3431 10 35C10 36.6569 11.3431 38 13 38ZM38 31C38 32.6569 36.6569 34 35 34C33.3431 34 32 32.6569 32 31C32 29.3431 33.3431 28 35 28C36.6569 28 38 29.3431 38 31Z"
                        fill="#0C172F"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-sm font-medium">Music</span>
                    <span className="text-xs text-gray-500">{genreCounts["Music"] || 0} Events</span>
                  </div>
                </li>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <li className="flex flex-col items-center p-4 rounded-lg shadow hover:shadow-lg transition-all" onClick={() => {
                  const section = document.getElementById("category-Courses");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                  <div className="icon-wrapper w-16 h-16 flex items-center justify-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 45 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.6243 8.07328C23.867 7.97487 24.1386 7.9756 24.3808 8.07532L41.3808 15.0753C41.7393 15.223 41.9802 15.5646 41.9988 15.9519C42.0175 16.3392 41.8106 16.7024 41.4679 16.8838L40 17.6609V30.1707C41.1652 30.5825 42 31.6938 42 33V37C42 38.6569 40.6569 40 39 40C37.3432 40 36 38.6569 36 37V33C36 31.6938 36.8348 30.5825 38 30.1707V18.7197L36 19.7785V28C36 28.3659 35.8001 28.7027 35.4789 28.8779L25.4366 34.3555C24.5411 34.8439 23.4589 34.8439 22.5635 34.3555L12.5212 28.8779C12.1999 28.7027 12 28.3659 12 28V19.7059L6.52779 16.7743C6.18591 16.5912 5.98077 16.2269 6.00143 15.8396C6.02209 15.4523 6.26484 15.1118 6.62426 14.9661L23.6243 8.07328ZM14 20.7773V27.4064L23.5212 32.5997C23.8196 32.7625 24.1804 32.7625 24.4789 32.5997L34 27.4064V20.8374L24.4679 25.8838C24.1737 26.0395 23.8212 26.0387 23.5278 25.8815L14 20.7773ZM38.6487 16.1133L23.9971 10.0803L9.35188 16.0183L24.0028 23.867L38.6487 16.1133ZM38 33C38 32.4477 38.4477 32 39 32C39.5523 32 40 32.4477 40 33V37C40 37.5523 39.5523 38 39 38C38.4477 38 38 37.5523 38 37V33Z"
                        fill="#0C172F"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-sm font-medium">Courses</span>
                    <span className="text-xs text-gray-500">{genreCounts["Courses"] || 0} Events</span>
                  </div>
                </li>
              </li>

              <li className="flex flex-col items-center space-y-2">
                <li className="flex flex-col items-center p-4 rounded-lg shadow hover:shadow-lg transition-all" onClick={() => {
                  const section = document.getElementById("category-Theatre");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                  <div className="icon-wrapper w-16 h-16 flex items-center justify-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 8C22 14.8247 17.4422 20.5849 11.2044 22.4028C12.9021 23.6801 14 25.7118 14 28V33C14 33.5523 13.5523 34 13 34C12.4477 34 12 33.5523 12 33V28C12 25.581 10.2822 23.5633 8 23.1V36C8 36.5523 7.55228 37 7 37C6.44772 37 6 36.5523 6 36V14.25C6 10.1901 9.17054 6 13.8 6H34.2C38.8295 6 42 10.1901 42 14.25V36C42 36.5523 41.5523 37 41 37C40.4477 37 40 36.5523 40 36V23.1C37.7178 23.5633 36 25.581 36 28V33C36 33.5523 35.5523 34 35 34C34.4477 34 34 33.5523 34 33V28C34 25.7118 35.0979 23.6801 36.7956 22.4028C30.5578 20.5849 26 14.8247 26 8H22ZM13.8 8C10.4961 8 8 11.0599 8 14.25V20.9621C14.7124 20.4515 20 14.8432 20 8H13.8ZM28 8C28 14.8432 33.2876 20.4515 40 20.9621V14.25C40 11.0599 37.5039 8 34.2 8H28Z"
                        fill="#0C172F"
                      ></path>
                      <path
                        d="M10 41C10 38.7909 11.7909 37 14 37C16.2091 37 18 38.7909 18 41C18 41.5523 18.4477 42 19 42C19.5523 42 20 41.5523 20 41C20 38.7909 21.7909 37 24 37C26.2091 37 28 38.7909 28 41C28 41.5523 28.4477 42 29 42C29.5523 42 30 41.5523 30 41C30 38.7909 31.7909 37 34 37C36.2091 37 38 38.7909 38 41C38 41.5523 38.4477 42 39 42C39.5523 42 40 41.5523 40 41C40 37.6863 37.3137 35 34 35C31.913 35 30.0749 36.0655 29 37.6822C27.9251 36.0655 26.087 35 24 35C21.913 35 20.0749 36.0655 19 37.6822C17.9251 36.0655 16.087 35 14 35C10.6863 35 8 37.6863 8 41C8 41.5523 8.44772 42 9 42C9.55228 42 10 41.5523 10 41Z"
                        fill="#0C172F"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-sm font-medium">Theatre</span>
                    <span className="text-xs text-gray-500">{genreCounts["Theatre"] || 0} Events</span>
                  </div>
                </li>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <li className="flex flex-col items-center p-4 rounded-lg shadow hover:shadow-lg transition-all" onClick={() => {
                  const section = document.getElementById("category-Health and Wellness");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                  <div className="icon-wrapper w-16 h-16 flex items-center justify-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.1852 27.9263L22.9487 17.9498C22.8208 17.5556 22.4743 17.2793 22.0709 17.2499C21.6674 17.2204 21.2865 17.4436 21.1056 17.8153L18.382 23.4121H15C14.4477 23.4121 14 23.8722 14 24.4396C14 25.0071 14.4477 25.4671 15 25.4671H19C19.3788 25.4671 19.725 25.2472 19.8944 24.8991L21.8148 20.9529L25.0513 30.9294C25.1792 31.3236 25.5257 31.5999 25.9291 31.6294C26.3326 31.6588 26.7135 31.4357 26.8944 31.064L29.618 25.4671H33C33.5523 25.4671 34 25.0071 34 24.4396C34 23.8722 33.5523 23.4121 33 23.4121H29C28.6212 23.4121 28.275 23.632 28.1056 23.9801L26.1852 27.9263Z"
                        fill="#0C172F"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.2764 11.104L24 11.8617L24.7236 11.104C24.9272 10.8907 25.1375 10.6884 25.3536 10.4971C29.3312 6.97633 35.303 7.17861 39.0515 11.104C42.9828 15.2208 42.9828 21.8797 39.0515 25.9966L26.8552 38.7685C25.2871 40.4105 22.7128 40.4105 21.1448 38.7685L8.94849 25.9966C5.01717 21.8797 5.01717 15.2208 8.94849 11.104C12.697 7.17861 18.6688 6.97633 22.6464 10.4971C22.8625 10.6884 23.0728 10.8907 23.2764 11.104ZM24 13.9167C24.537 13.9167 25.0515 13.6948 25.4276 13.3009L26.1512 12.5432C29.3193 9.22554 34.4558 9.22555 37.6239 12.5432C40.792 15.8608 40.792 21.2397 37.6239 24.5574L25.4276 37.3293C24.6436 38.1503 23.3564 38.1503 22.5724 37.3293L10.3761 24.5574C7.20797 21.2397 7.20797 15.8608 10.3761 12.5432C13.5442 9.22554 18.6807 9.22554 21.8488 12.5432L22.5724 13.3009C22.9485 13.6948 23.463 13.9167 24 13.9167Z"
                        fill="#0C172F"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-sm font-medium">Health and Wellness</span>
                    <span className="text-xs text-gray-500">{genreCounts["Health and Wellness"] || 0} Events</span>
                  </div>
                </li>
              </li>
            </ul>
            <div>

            </div>
          </section>

          <div className="p-4">
            {Object.entries(categorizedEvents).map(([category, categoryEvents]) => (
              <div key={category} id={`category-${category}`} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryEvents.map((event) => (
                    <div
                      key={event._id}
                      className="w-full h-[430px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col justify-between p-4 hover:shadow-xl transition-shadow"
                    >
                      <div>
                        <img
                          src={event.imageURL}
                          alt={`${event.eventName} Image`}
                          className="w-full h-64 object-contain rounded-md"
                        />
                        <div className="text-lg font-bold mt-2 truncate">{event.eventName}</div>
                        <div className="text-sm text-gray-600 line-clamp-2">{event.description}</div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm">
                          <div>
                            <span className="font-semibold">Location:</span> {event.location}
                          </div>
                          <div>
                            <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-semibold">Time:</span> {event.time}
                          </div>
                        </div>
                        <div className="font-bold text-green-600 text-center">
                          ₹{event.price}
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookTicket(event._id)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all mt-4"
                      >
                        Book Ticket
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
