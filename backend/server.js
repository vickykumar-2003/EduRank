const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());


//Test Route
app.get("/" , (req,res) =>{
    res.send("EduRank API is Running.....");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});