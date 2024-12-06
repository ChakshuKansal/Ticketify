import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    duration: '',
    eventType: 'Digital Event',
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
      console.log('Event Data:', formData);

      try {
        const res = await fetch('http://localhost:5000/Event', {
          method: 'post',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const result = await res.json(); // Assuming the server sends a JSON response
          console.log('Server Response:', result);
          alert('Event created successfully!');
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
    <div>
      <Navbar />
      <div className="flex justify-center m-10">
        <form onSubmit={handleSubmit} className="w-96 p-5 shadow-lg border rounded-lg bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Event</h2>

          {/* Event Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded"
              placeholder="Enter event name"
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded"
            />
          </div>

          {/* Time */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded"
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Duration (in hours)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded"
              placeholder="Enter duration"
              min="1"
            />
          </div>

          {/* Event Type */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded"
            >
              <option value="Digital Event">Digital Event</option>
              <option value="Ground Event">Ground Event</option>
            </select>
          </div>

          {/* Event Category */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Event Category</label>
            <select
              name="eventCat"
              value={formData.eventCat}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full p-3 rounded"
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
            className="w-full bg-blue-500 text-white py-3 text-lg rounded hover:bg-blue-600"
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
