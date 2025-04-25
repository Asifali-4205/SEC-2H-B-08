const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/loginDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
const busbookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    from: String,
    to: String,
    seats: [String],
    busType: String,
    date: { type: Date, default: Date.now }
  });
  
  const busbookings = mongoose.model('busbookings', busbookingSchema); 
  const carbookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    from: String,
    to: String,
    carType: String,
    seatNumbers: [String]
  });
  
  const carbookings = mongoose.model("carbookings", carbookingSchema);
  const trainSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    train: String,
    seats: [String],
    date: { type: Date, default: Date.now }
  });
  
  const trainbookings = mongoose.model('trainbookings', trainSchema);
  const concertSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    concert: String,
    seats: [String],
    date: { type: Date, default: Date.now }
  });
  
  const ConcertBooking = mongoose.model("concertbookings", concertSchema);
  const flightSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    from: String,
    to: String,
    flightNumber: String,
    seats: [String],
    date: { type: Date, default: Date.now }
  });
  
  const flightbookings = mongoose.model("flightbookings", flightSchema);
  const eventBookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    from: String,
    to: String,
    event: String,
    seats: [String],
    date: { type: Date, default: Date.now }
  });
  
  const EventBooking = mongoose.model("EventBooking", eventBookingSchema);
  app.post('/trainbookings', async (req, res) => {
  try {
    const booking = new trainbookings(req.body);
    await booking.save();
    res.status(200).send("Booking successful!");
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).send("Booking failed.");
  }
});



// SignUp Endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).send('Username already exists');
  }

  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).send('User registered successfully');
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});
// Bus Booking Endpoint
app.post('/busbookings', async (req, res) => {
  try {
    const booking = new busbookings(req.body);
    await booking.save();
    res.status(200).send("Bus booking saved successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving bus booking");
  }
});


// Car Booking Endpoint
app.post('/carbookings', async (req, res) => {
  try {
    const booking = new carbookings(req.body); // ✅ use 'carbookings'
    await booking.save();
    res.status(200).send("Booking saved successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving booking");
  }
});
app.post("/concertbookings", async (req, res) => {
  try {
    const booking = new ConcertBooking(req.body);
    await booking.save();
    res.status(200).send("Concert booking successful!");
  } catch (err) {
    console.error("Booking failed:", err);
    res.status(500).send("Failed to save booking.");
  }
})
app.post("/flightbookings", async (req, res) => {
  try {
    const booking = new flightbookings(req.body);
    await booking.save();
    res.status(200).send("Flight booking successful!");
  } catch (err) {
    console.error("Flight booking error:", err);
    res.status(500).send("Flight booking failed.");
  }
});
app.post('/eventbookings', async (req, res) => {
  try {
    const booking = new EventBooking(req.body);
    await booking.save();
    res.status(200).send("Event booking successful!");
  } catch (err) {
    console.error("Error saving event booking:", err);
    res.status(500).send("Failed to save booking.");
  }
});
// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
