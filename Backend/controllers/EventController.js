const { configDotenv } = require("dotenv");
const EventSchema=require("../models/Events")
configDotenv();

const Eventadder= async (req, res) => {
    try {
        const { eventName, date, time,location,imageURL,price,duration,description, eventType, eventCat } = req.body;
        const NewEvent = new EventSchema({
            eventName: eventName,
            date: date,
            time: time,
            duration: duration,
            eventType: eventType,
            eventCat: eventCat,
            location:location,
            imageURL:imageURL,
            description:description,
            price:price,
        });
        await NewEvent.save();
        res.status(201).json({ message: "Event Created Successfully" });
        console.log("EVENT SUCCESSFULLY ADDED!");
    } catch (error) {
        console.error("Error while creating event:", error);
        res.status(500).json({
            message:"An error occurred while creating the event. Please try again later.",
        });
    }
}

const EventFetcher=async (req, res) => {
    try {
        const events = await EventSchema.find();
        if (events.length === 0) {
            return res.status(404).json({ "message": "No Events Till Now" });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal Server Error!" });
    }
}

module.exports={Eventadder , EventFetcher};