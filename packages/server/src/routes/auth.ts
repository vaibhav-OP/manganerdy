import express from "express";
import jwt from "jsonwebtoken";

import userSchema from "../models/user.model";

const router: express.Router = express.Router();
const jsonwebtoken_secret = process.env.jsonwebtoken_secret || "test";

router.post("/sign-up", async (req, res) => {
    const { user_name, email, password } = req.body;

    try {
        const user = new userSchema({
            user_name,
            email,
            password
        })
        user.save()
            .then(userObject => {
                // signing a token to save locally for future use
                const token = jwt.sign({ user_id: userObject._id, user_name, email }, jsonwebtoken_secret);
                res.cookie("token", token, { httpOnly: true })
                return res.send({ status: "ok", token })
            })

    } catch(error) {
        // checking if error message is duplication one
        if(error.code === 11000) return res.send({ status: "bad request", error: "Duplicate user name or email" });
        return res.send({ status: "bad request", error: error.message });

    }
})

router.post("/sign-in", async(req, res) => {
    const { email, password } = req.body;

    const user = await userSchema.findOne({email});
    if(!user) return res.send({status: "not found", error: "Account not found."})
    const result = await user.comparePassword(password);
    const token = jwt.sign({ user_id: user._id, user_name: user.user_name, email: user.email }, jsonwebtoken_secret);

    if(result) {
        res.cookie("token", token, { httpOnly: true })
        return res.send({ status: "ok", token})
    }
    res.send({ status: "error", error: "Email or Password is not correct."})
})

router.get("/verify", async(req, res) => {
    let { token } = req.cookies;
    if(!token) {
        token = req.query.token;
    }


    try {
        const userData = jwt.verify(token, jsonwebtoken_secret) as JwtPayload;
        const user = await userSchema.findById(userData.user_id)
        userData.isAdmin = user.isAdmin
        res.send({ status: "ok", data: userData});
    } catch(error) {
        res.send({ status: "error", error: "Not a valid token"})
    }

})

router.get("/sign-out", async(req, res) => {
    res.clearCookie('token');
    return res.send({ status: "ok", message: "done" })
})

interface JwtPayload {
    user_id: string,
    user_name: string,
    email: string,
    isAdmin: boolean
}

export default router;
