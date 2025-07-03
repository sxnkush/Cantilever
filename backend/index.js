const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8001;
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
const dotenv = require("dotenv")
dotenv.config()

const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");
const { connectMongoose } = require("./connection");
const taskModel = require("./models/task");

connectMongoose(process.env.MONGO_URI).then(() =>
  console.log("Mongoose Connected")
);

const corsOptions = {
  origin: ["http://localhost:5173", "https://task-manager-180.netlify.app"],
  credentials: true
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // handles preflight

app.use(cookieParser());
app.use(express.json());

app.use("/api/task", restrictToLoggedInUserOnly, taskRoute);
app.use("/api/user", checkAuth, userRoute);


app.listen(PORT, () => console.log("Server Started"));
