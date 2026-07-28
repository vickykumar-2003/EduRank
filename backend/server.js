const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);


//Test Route
app.get("/" , (req,res) =>{
    res.send("EduRank API is Running.....");
});

const PORT = process.env.PORT || 5000;


connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});