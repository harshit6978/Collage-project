const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const imageRoute = require("./routes/image")
const userRoute = require("./routes/user")
const app = express()
dotenv.config();
const cors = require('cors')
app.use(express.json())

const port = process.env.PORT || 8000;
app.use(cors());
app.get('/', (req, res) => {
    res.send("Welcome to the API")
})




const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error
    }
}

// app.use(express.urlencoded({ extended: true }));

mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
})

mongoose.connection.on("connected", () => {
    console.log("connected");
})

app.use('/api/v1/all', imageRoute)
app.use('/api/v1/user', userRoute)


app.use(express.json({ limit: "3mb" }))

app.listen(port, () => {
    connect();
    console.log(`listning from ${port}`);
})