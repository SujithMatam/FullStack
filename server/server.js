require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const path = require("path");

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contacts", contactRoutes);

app.use("/public", express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));