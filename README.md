# Event Ticket Booking App

![Event Ticket Booking App](https://img.shields.io/badge/Tech-MERN%20Stack-blue)

## 📖 Introduction

The **Event Ticket Booking App** is a full-stack web application built using the **MERN stack** (MongoDB, Express, React, Node.js). This platform allows users to book tickets for various events such as **concerts**, **theater performances**, **workshops**, and **festivals**. Event organizers can publish and manage their events, while users can browse events, select tickets, and complete bookings seamlessly.

### Key Features:
- **User Authentication**: Secure login and registration with JWT authentication.
- **Event Browsing**: Browse and filter events by category (e.g., concerts, theater, workshops).
- **Ticket Booking**: Select and book tickets for various events.
- **Event Publishing**: Event organizers can create, edit, and manage their events.
- **Subscription & Notifications**: Users can subscribe for updates and newsletters about upcoming events.
- **Scalable Architecture**: Built using the MERN stack, providing flexibility and scalability.
  
---

## ⚙️ Tech Stack

- **Frontend**:  
  - React.js  
  - Redux (for state management)  
  - React Router (for navigation)  
  - Tailwind CSS (for styling)

- **Backend**:  
  - Node.js  
  - Express.js  
  - MongoDB  
  - JWT Authentication

---

##  Features

- **User Registration & Login**  
  Users can register and log in securely to access the app. Their data is stored with encryption, and login is handled via JWT authentication.

- **Event Management for Organizers**  
  Event organizers can create new events, including details such as name, description, location, date, and price. They can also update or delete events as needed.

- **Ticket Booking for Users**  
  Users can view events and select tickets for their preferred events. They can see ticket availability, pricing, and event details before making a purchase.

- **Event Categories**  
  Users can filter events by categories such as **Music**, **Theater**, **Workshops**, and **Festivals** to find the events that interest them most.

- **Subscription to Newsletters**  
  Users can subscribe to newsletters or event updates, ensuring they never miss an important event announcement.

---

## 📦 Installation

To run this project locally, follow these steps:

### 1. Clone the repository:
```bash
git clone https://github.com/ChakshuKansal/Ticketify.git
```

###2. Install dependencies:
Navigate to the backend and frontend directories and install the dependencies:

#### Backend:
```bash
cd Backend
npm install
```

#### Frontend:
```bash
cd Frontend
npm install
```

### 3. Configure environment variables:
Create a .env file in the backend directory and add the following environment variables:

```make
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the app:

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd Frontend
npm run dev
```

## Project Structure

```
Ticketify/
├── Backend/              # Backend source code
│   ├── config/           # Configuration files (e.g., database, environment variables) 
│   ├── controllers/      # middleware controllers for API routes 
│   └── models/           # Database models (e.g., User, Event) 
└── Frontend/             # Frontend source code
    ├── public/           # Static assets
    └── src/
        └── components/       # Reusable components 
```


## Application Flow

### 1. **Authentication**
   - **User Registration**: Users can register with their email and password. Email verification ensures valid registration.
   - **JWT-based Authentication**: After registration, users log in using their credentials. A JWT token is generated for secure access.
   - **Protected Route Handling**: Certain routes, such as booking tickets or event management, are protected and require JWT authentication to access.

### 2. **Content Management**
   - **Event Creation**: Event organizers can create new events, providing details such as event name, description, location, price, and schedule.
   - **Image Upload and Management**: Organizers can upload images for events. These images are stored and displayed alongside event details.
   - **Tag System for Categorization**: Events are categorized with tags such as "Music," "Theater," or "Workshop" to help users filter and find relevant events.

### 3. **User Interactions**
   - **Ticket Booking System**: Users can browse events and book tickets. They can view ticket availability, prices, and event details before making a booking.
   - **Event Subscription**: Users can subscribe to newsletters or event updates to stay informed about new events or important changes.

## Acknowledgments

- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)


