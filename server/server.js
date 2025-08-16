const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));

app.use(express.json());

//Routes
app.use('/api', feedbackRoutes);
app.get("/", (req, res) => {
  res.send("Server is live");
});


//MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://shreyagupta:shreyagupta008@cluster0.tyfdoqm.mongodb.net").then(()=>console.log("MongoDB Connected")).catch(error=>console.log(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));