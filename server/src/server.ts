import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;
const mongooseUrl: string = "mongodb://127.0.0.1:27017/apex_manga";

// all middleware
app.use(cors({
    origin: 'http://localhost:3000',
    preflightContinue: true,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// connecting mongoose from the url
mongoose.connect(mongooseUrl, () => {
    console.log("mongoose connected.");
})

// using all the routes
import authRoute from "./routes/auth";
import comicRoute from "./routes/comic";
import indexRoute from "./routes/index";
import adminRoute from "./routes/admin";

app.use("/", indexRoute);
app.use("/admin", adminRoute)
app.use("/auth", authRoute);
app.use("/comics", comicRoute);

// listening to the port
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})
