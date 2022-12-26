import fs from "fs";
import express from "express";
import request from "request";

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
let uid = (function(){let id=0;return function(){if(arguments[0]===0)id=0;return id++;}})();

Router.post("/comic", async(req, res) => {
    const {
        title,
        autherName,
        description,
        coverPageURL,
        genre,
    } = req.body

    const imageID = uid();
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
