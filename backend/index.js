const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 8001

const taskRoute = require("./routes/task")
const staticRoute = require("./routes/staticRoute")
const {connectMongoose} = require("./connection")
const taskModel = require("./models/task")

connectMongoose("mongodb://127.0.0.1:27017/task").then(() =>   
    console.log("Mongoose Connected")
)

app.use(cors({
    origin: 'http://localhost:5173' 
  }));
app.use(express.json())
app.use("/task", taskRoute)
app.use("/", staticRoute)

app.listen(PORT, ()=>console.log("Server Started"))

