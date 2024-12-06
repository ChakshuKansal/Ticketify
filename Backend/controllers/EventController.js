const { configDotenv } = require("dotenv");
const EventSchema=require("../models/Events")
configDotenv();

const Eventadder= async (req, res) => {
    try {
        const { eventName, date, time, duration, eventType, eventCat } = req.body;
        const NewEvent = new EventSchema({
            eventName: eventName,
            date: date,
            time: time,
            duration: duration,
            eventType: eventType,
            eventCat: eventCat,
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
module.exports=Eventadder;