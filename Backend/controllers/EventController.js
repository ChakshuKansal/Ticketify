const { configDotenv } = require("dotenv");
const Event = require("../models/Events"); 
configDotenv();

const Eventadder = async (req, res) => {
    try {
      if (!req.user || !req.user.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      console.log(req.user.user)

      const userId = req.user.user;
      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing' });
      }

      const newEvent = new Event({
        eventName: req.body.eventName,
        description: req.body.description,
        imageURL: req.body.imageURL,
        location: req.body.location,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        eventType: req.body.eventType,
        eventCat: req.body.eventCat,
        userId: userId, 
      });
  
      await newEvent.save();
      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      console.error('Error while creating event:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


const EventFetcher = async (req, res) => {
    try {
        const events = await Event.find();
        if (events.length === 0) {
            return res.status(404).json({ "message": "No Events Till Now" });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal Server Error!" });
    }
};

const cancelEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: 'Event canceled successfully' });
  } catch (error) {
    console.error('Error canceling event:', error);
    res.status(500).json({ message: 'Failed to cancel event' });
  }
};

const modifyEvent = async (req, res) => {
  const { eventId } = req.params;
  const { eventName, description, price, location, date, time, imageURL } = req.body;

  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.eventName = eventName || event.eventName;
    event.description = description || event.description;
    event.price = price || event.price;
    event.location = location || event.location;
    event.date = date || event.date;
    event.time = time || event.time;
    event.imageURL = imageURL || event.imageURL;

    await event.save();

    res.status(200).json({ message: 'Event modified successfully', event });
  } catch (error) {
    console.error('Error modifying event:', error);
    res.status(500).json({ message: 'Failed to modify event' });
  }
};


module.exports = { Eventadder, EventFetcher ,cancelEvent,modifyEvent};
