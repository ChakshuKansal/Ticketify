import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [publishedEvents, setPublishedEvents] = useState([]); // New state for published events
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await fetch('http://localhost:5000/user-profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          setUserData(data.user);
          setBookings(data.bookings);
          setPublishedEvents(data.publishedEvents); // Set the published events
        } else {
          console.error('Unexpected response:', await response.text());
          setHasError(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setHasError(true);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:5000/cancel-booking/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking.');
    }
  };

  const handleCancelEvent = async (eventId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this event?');
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:5000/cancel-event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPublishedEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error canceling event:', error);
      alert('Failed to cancel event.');
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (hasError) {
    return <div className="text-center text-lg text-red-500">Failed to load profile data. Please try again later.</div>;
  }

  return (
    <>
      <Navbar token={token} />
      <div className='h-10'></div>
      <div className="profile-page p-6 md:p-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Profile</h1>
          {userData ? (
            <div className="profile-info mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
              <p><strong className="text-gray-600">Name:</strong> {userData.fullname}</p>
              <p><strong className="text-gray-600">Email:</strong> {userData.email}</p>
            </div>
          ) : (
            <p className="text-gray-500">No user data available</p>
          )}

          <div className="bookings mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Bookings</h2>
            {bookings && bookings.length === 0 ? (
              <p className="text-gray-500">You have no bookings yet.</p>
            ) : (
              <div className="booking-list">
                {bookings.map((booking) => (
                  <div key={booking._id} className="booking-item mb-6 p-4 border border-gray-300 rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between">
                      <div className="flex flex-wrap items-center mb-4">
                        <img
                          src={booking.imageURL}
                          alt={booking.eventName}
                          className="w-20 h-20 object-cover rounded-full mr-4"
                        />
                        <div>
                          <p><strong className="text-gray-700">Event:</strong> {booking.eventName}</p>
                          <p><strong className="text-gray-700">Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                          <p><strong className="text-gray-700">Time:</strong> {booking.time}</p>
                          <p><strong className="text-gray-700">Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          aria-label="Cancel booking"
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="published-events">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Published Events</h2>
            {publishedEvents && publishedEvents.length === 0 ? (
              <p className="text-gray-500">You have not published any events yet.</p>
            ) : (
              <div className="event-list">
                {publishedEvents.map((event) => (
                  <div key={event._id} className="event-item mb-6 p-4 border border-gray-300 rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between">
                      <div className="flex flex-wrap items-center mb-4">
                        <img
                          src={event.imageURL}
                          alt={event.eventName}
                          className="w-20 h-20 object-cover rounded-full mr-4"
                        />
                        <div>
                          <p><strong className="text-gray-700">Event:</strong> {event.eventName}</p>
                          <p><strong className="text-gray-700">Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                          <p><strong className="text-gray-700">Time:</strong> {event.time}</p>
                          <p><strong className="text-gray-700">Published On:</strong> {new Date(event.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={() => handleCancelEvent(event._id)}
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                          Cancel Event
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
