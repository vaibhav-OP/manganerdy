import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({ path: '.env.local' })
const app = express();
const PORT = process.env.PORT || 8080;

// all middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://107.189.12.106:3000", "https://manganerdy.com"],
    preflightContinue: true,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public', {
    maxAge: 60 * 60 * 24

}));

// connecting mongoose from the url
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.mongoURL)
    .then(() => console.log('SUCCESS CONNECTED TO THE DATABASE!'))
    .catch((error) => {
        console.log(error)
        console.log('SOMETHING WENT WRONG WHILE CONNECTING TO THE DATABASE!');
        process.exit(1);
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
