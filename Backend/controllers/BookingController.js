const Events = require("../models/Events");
const Booking = require('../models/Booking');
const User = require('../models/Users');

const bookTicket = async (req, res) => {
    const { eventId } = req.body;
    const userId = req.user.user;

    try {
        // Fetch event and user details
        const event = await Events.findById(eventId);
        const user = await User.findById(userId);

        if (!event || !user) {
            return res.status(400).json({ message: 'Invalid Event or User ID.' });
        }

        const booking = await Booking.create({
            eventId,
            eventName: event.eventName,
            imageURL: event.imageURL,
            date: event.date, 
            time: event.time,
            userId,
            bookingDate: new Date(),
        });

        res.status(201).json({ message: 'Ticket booked successfully!', booking });
    } catch (error) {
        console.error('Error booking ticket:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { bookTicket };
