const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const imageRoute = require("./routes/imageRoute");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

console.log("Mongo URL:", MONGO_URL); // Debugging the URL
console.log("Port:", PORT); // Debugging the port

mongoose
  .connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/image", imageRoute);
