const dns = require("dns")
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const adminRoutes = require("./routes/adminRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
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
app.use("/api/exam", examRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/attempt", attemptRoutes);
app.use("/api/question", questionRoutes);


//Test Route
app.get("/" , (req,res) =>{
    res.send("EduRank API is Running.....");
});

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;


connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});