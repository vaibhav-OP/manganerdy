import express from "express";
import mongoose from "mongoose";

const router: express.Router = express.Router();

router.get("/ping", async(req,res) => {
    if(mongoose.connection.readyState !== 1) return res.send({ status: "error", message: "server is not running"})
    res.send({ status: "ok" })
})

export default router;