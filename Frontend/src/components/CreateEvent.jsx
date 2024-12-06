import React, { useState } from 'react';
import Footer from './Footer';

const CreateEvent = ({ showevent, eventType }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    duration: '',
    eventType: eventType,
    eventCat: 'Comedy',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { eventName, date, time, duration, eventType, eventCat } = formData;

    if (eventName && date && time && duration && eventCat) {
      const today = new Date();
      const maxDate = new Date();
      maxDate.setFullYear(today.getFullYear() + 1);
      const selectedDate = new Date(date);
      if (selectedDate > maxDate) {
        alert('The selected booking date exceeds one year from today.\n Please choose a valid date within the next year.');
        return;
      }
      if (selectedDate <today ) {
        alert('The selected date is in the past. Please choose a valid future date.');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/Event', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const result = await res.json();
          console.log('Server Response:', result);
          alert('Event created successfully!');
          // Reset the form data after successful submission
          setFormData({
            eventName: '',
            date: '',
            time: '',
            duration: '',
            eventType: eventType,
            eventCat: 'Comedy',
          })
        } else {
          const error = await res.json();
          console.error('Server Error:', error);
          alert(error.message || 'Something went wrong!');
        }
      } catch (err) {
        console.error('Network Error:', err);
        alert('Failed to create the event. Please try again later.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex justify-center my-10 w-full px-4 sm:px-8 md:px-16">
        <form onSubmit={handleSubmit} className="w-full max-w-5xl p-8 shadow-lg rounded-lg bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Create Event</h2>
            <button
              onClick={() => showevent(false)}
              className="text-red-500 text-3xl font-bold hover:bg-red-100 rounded-full p-1"
            >
              &times;
            </button>
          </div>

          {/* Event Name */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event name"
            />
          </div>

          <div className="mb-6 flex space-x-4">
            {/* Date */}
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time */}
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6 flex space-x-4">
            {/* Duration */}
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">Duration (in hours)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter duration"
                min="1"
              />
            </div>

            {/* Event Type */}
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Digital Event">Digital Event</option>
                <option value="Ground Event">Ground Event</option>
              </select>
            </div>
          </div>

          {/* Event Category */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Event Category</label>
            <select
              name="eventCat"
              value={formData.eventCat}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Comedy">Comedy</option>
              <option value="Theatre">Theatre</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Story">Storytelling</option>
              <option value="Course">Course</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 text-lg rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Event
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;
