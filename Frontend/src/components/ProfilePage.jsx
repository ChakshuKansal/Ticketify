import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [updatedEventData, setUpdatedEventData] = useState({
    eventName: '',
    description: '',
    imageURL: '',
    location: '',
    price: '',
    date: '',
    time: '',
    duration: '',
    eventType: '',
    eventCat: '',
  });

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
          setPublishedEvents(data.publishedEvents);
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

  const handleModifyEvent = async (eventId) => {
    const confirmModify = window.confirm('Are you sure you want to modify this event?');
    if (!confirmModify) return;

    try {
      const response = await fetch(`http://localhost:5000/modify-event/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEventData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setPublishedEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, ...updatedEventData } : event
          )
        );
        setEditingEvent(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error modifying event:', error);
      alert('Failed to modify event.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                          onClick={() => {
                            setEditingEvent(event);
                            setUpdatedEventData({
                              eventName: event.eventName,
                              description: event.description,
                              imageURL: event.imageURL,
                              location: event.location,
                              price: event.price,
                              date: event.date,
                              time: event.time,
                              duration: event.duration,
                              eventType: event.eventType,
                              eventCat: event.eventCat,
                            });
                          }}
                          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                          Modify Event
                        </button>
                        <button
                          onClick={() => handleCancelEvent(event._id)}
                          aria-label="Cancel event"
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

          {editingEvent && (
            <div className="edit-event-form p-6 bg-gray-100 rounded-lg shadow-md mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Event</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleModifyEvent(editingEvent._id); }}>
                <div className="mb-4">
                  <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={updatedEventData.eventName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={updatedEventData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    id="imageURL"
                    name="imageURL"
                    value={updatedEventData.imageURL}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={updatedEventData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={updatedEventData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={updatedEventData.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={updatedEventData.time}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={updatedEventData.duration}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
                  <input
                    type="text"
                    id="eventType"
                    name="eventType"
                    value={updatedEventData.eventType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="eventCat" className="block text-sm font-medium text-gray-700">Event Category</label>
                  <input
                    type="text"
                    id="eventCat"
                    name="eventCat"
                    value={updatedEventData.eventCat}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Save Changes
                </button>
              </form>
              <button
                onClick={() => setEditingEvent(null)}
                className="mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
