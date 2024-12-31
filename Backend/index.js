import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import { config as dotenvConfig } from "dotenv";
import connectDb from "./config/connectDb.js";
import {
  SignUp,
  Login,
  authenticateToken,
  UserDetails,
} from "./controllers/AuthController.js";
import Subscriber from "./controllers/SubController.js";
import {
  Eventadder,
  EventFetcher,
  cancelEvent,
  modifyEvent,
} from "./controllers/EventController.js";
import { bookTicket, cancelTicket } from "./controllers/BookingController.js";


const app = express();
const _dirname = path.resolve();
dotenvConfig();
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://ticketify-ab9o.onrender.com/" }));

// Routes
app.post("/letter", Subscriber);
app.post("/SignUp", SignUp);
app.post("/LogIn", Login);
app.post("/Event", authenticateToken, Eventadder);
app.post("/book-ticket", authenticateToken, bookTicket);

app.get("/Events", EventFetcher);
app.get("/user-profile", authenticateToken, UserDetails);

app.post("/api/auth/validate-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ valid: false, message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret_key);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ valid: false, message: "Token expired" });
    } else {
      res.status(403).json({ valid: false, message: "Invalid token" });
    }
  }
});

app.put("/modify-event/:eventId", authenticateToken, modifyEvent);
app.delete("/cancel-booking/:bookingId", authenticateToken, cancelTicket);
app.delete("/cancel-event/:eventId", authenticateToken, cancelEvent);

// Serve React Frontend
app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
