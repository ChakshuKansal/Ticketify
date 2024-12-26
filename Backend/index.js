const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./config/connectDb");
const { configDotenv } = require("dotenv");
const { SignUp, Login, authenticateToken,UserDetails } = require("./controllers/AuthController");
const Subscriber = require("./controllers/SubController");
const {Eventadder,EventFetcher} = require("./controllers/EventController");
const { bookTicket, cancelTicket } = require('./controllers/BookingController'); 

configDotenv();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.post("/letter", Subscriber);
app.post("/SignUp", SignUp);
app.post("/LogIn", Login);
app.post("/Event", Eventadder);
app.post('/book-ticket', authenticateToken, bookTicket );

app.get("/Events", EventFetcher );
app.get('/user-profile', authenticateToken,UserDetails );

app.delete('/cancel-booking/:bookingId', authenticateToken, cancelTicket);

app.listen(process.env.PORT, () => {
    console.log("Running on http://localhost:5000");
});
