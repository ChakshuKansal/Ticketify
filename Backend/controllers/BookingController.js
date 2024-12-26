const Events = require("../models/Events");
const Booking = require('../models/Booking');
const User = require('../models/Users');

const bookTicket = async (req, res) => {
    const { eventId } = req.body;
    const userId = req.user.user;

    try {
        const event = await Events.findById(eventId);
        const user = await User.findById(userId);

        if (!event || !user) {
            return res.status(400).json({ message: 'Invalid Event or User ID.' });
        }
        const existingBooking = await Booking.findOne({ eventId, userId });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked a ticket for this event.' });
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


const cancelTicket=async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        if (booking.userId.toString() !== req.user.user) {
            return res.status(403).json({ message: 'Unauthorized to cancel this booking.' });
        }
        await Booking.findByIdAndDelete(bookingId);
        res.status(200).json({ message: 'Booking canceled successfully.' });
    } catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { bookTicket,cancelTicket };
