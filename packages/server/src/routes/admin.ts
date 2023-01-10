import fs from "fs";
import express from "express";
import request from "request";
import { v4 as uuidv4 } from 'uuid';

import comicModel from "../models/comic.model";

const Router: express.Router = express.Router()

let download = function(uri: string, filename: string): Promise<string>{
    return new Promise((resolve, reject) => {
        request.head(uri, function(err, res, body){
            if(err)return reject("error");
            request(uri).pipe(fs.createWriteStream(filename)).on("close", function(){resolve("done")});
        });
    })
};

const admins = [
    {
        user_name: process.env.user_name,
        user_passwd: process.env.user_passwrd
    }
]

Router.get("/login", async(req,res) => {
    const {
        user_name,
        user_passwd
    } = req.query

    const adminData = admins.find(user => user.user_name == user_name)

    if(!adminData) return res.status(401).send();
    if (user_name == adminData.user_name && user_passwd == adminData.user_passwd) return res.status(200).send();
    res.status(401).send()
})

Router.post("/comic", async(req, res) => {
    const {
        title,
        autherName,
        description,
        coverPageURL,
        genre,
    } = req.body

    const imageID = uuidv4();
    const extension = coverPageURL.split('.').pop();

    const filename = imageID + "." + extension
    console.log(filename)
    download(coverPageURL, `./src/public/coverPicture/${filename}`)
        .then(response => {
            const comic = new comicModel({
                title,
                description,
                profilePhotoLocation: "http://localhost:3001/coverPicture/" + filename,
                authorName: autherName,
                genre
            });

            comic.save(function(err, doc) {
                if (err) return console.error(err);
                console.log(comic.title + "was added to the database sucessfully.");
                res.send({ status: "ok", data: comic._id})
            })
        })
        .catch(err => {
            return res.send({ status: "error", error: "invalid coverPicture"  })
        })
})

export default Router;
