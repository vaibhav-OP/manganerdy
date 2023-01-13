import path from "path";
import express from "express";
import { v4 as uuidv4 } from 'uuid';
import imageDownloader from "image-downloader";
import comicSchema from "../models/comic.model";
import chaptersSchema from "../models/comic_chapters.model";

import getImageUrls from "../libs/getImageUrls";

const router: express.Router = express.Router();

/*
    Get query for most viewed comics,
    have to work on res.send, send.send(status: "error") is surely not the best way
*/
router.get("/most_viewed", async(req, res) => {
    const {
        limit,
        page
    } = req.query as unknown as MostViewedQuery;

    try {
        const data = await comicSchema.find()
                                .select('title profilePhotoLocation')
                                .sort({view: -1})
                                .skip(limit * page)
                                .limit(limit)
                                .exec();
        if(!data || data == null) return res.send({ status: "error" });
        res.send({ status: "ok", data })
    } catch(error) {
        console.log(error)
        res.send({ status: "error" });
    }

});


/*
    Get query for latest updated comics.
    have to work on error handing like for the finished
*/
router.get("/latest_updated", async(req, res) => {
    const {
        limit,
        page
     } = req.query as unknown as LatestUpdatedQuery;

    try {
        const comicData = await comicSchema.find()
                                .select('title authorName profilePhotoLocation genre')
                                .sort({updatedAt: -1})
                                .limit(limit)
                                .skip(limit * page)
                                .exec();

        if(!comicData) return res.send({ status: "error" });
        if(comicData.length === 0) return res.send({ status: "error", msg: "last array"})

        res.send({ status: "ok", data: comicData});
    } catch (error) {
        res.send({ status: "error" })
    }
});

/*
    query for latest created comics (banner),
    same as above error handling is poor
*/
router.get("/latest_created", async(req, res) => {
    try {
        const comicData = await comicSchema.find()
                                .select('title profilePhotoLocation description authorName')
                                .sort({createdAt: -1})
                                .limit(6)
                                .exec();

    if(!comicData) return res.send({ status: "error" });
    res.send({ status: "ok", data: comicData})
    } catch (error) {
        res.status(403).send({ status: "error" })
    }
})

router.get("/comic/:id", async(req, res) => {
    const { id } = req.params;
    const chapter = new chaptersSchema()
    try {
        const comicData = await comicSchema.findById(id)
                                    .select('-view')
                                    .populate("chapters", "chapters._id chapters.name")
                                    .exec();

        if(!comicData) return res.send({ status: "error" });
        res.send({ status: "ok", data: comicData})
    } catch (err) {
        console.log("error", err)
        res.send({ status: "error" });
    }
})

router.get("/search", async(
        req: express.Request,
        res: express.Response
    ) => {
    const { title } = req.query as unknown as SearchQuery;

    if(!title) return res.send({ status: "error"});

    try {
        const comics = await comicSchema.find({ $text: { $search: title } })
                                        .select("title profilePhotoLocation authorName genre")
                                        .exec();

        res.send({ status: "ok", data: comics })
    } catch(e) {
        console.log("Error while searching for comic", e)
        res.send({ status: "error" })
    }
})

/*
    Get chapter
*/
router.get("/chapter", async(req, res) => {
    const { id, name } = req.query;

    const chapterObjRaw = await chaptersSchema.findOne({
            "chapters.id": id
        }).exec()
    if(!chapterObjRaw) return res.status(404).send()

    const chapterFinal = chapterObjRaw.chapters.find(chapter => chapter.name === name);
    if(!chapterFinal) return res.status(404).send()
    chapterFinal.url = chapterFinal.url.sort();

    res.send(chapterFinal)
})

/*
    add chapter POST
*/
router.post("/chapter", async(req, res) => {
    const {
        id,
        chapter_name,
        chapter_url
    } = req.body;

    const comic = await comicSchema.findById(id)
        .select("chapters")
    if(!comic) return res.status(404).send();

    const chapter = await chaptersSchema.findByIdAndUpdate(comic.chapters._id)

    const data = await getImageUrls(chapter_url);

    const chapterObj:ChapterObj = {
        name: chapter_name,
        url: []
    }

    await Promise.all(data.map(async(url, index) => {
        const extension = url.split('.').pop();
        const filename = uuidv4() + "." + extension;
        const chapterNum = url.split(".")[0]

        if(!extension || extension === "Index") return;

        await imageDownloader.image({
            url: chapter_url + url,
            dest: path.join(__dirname, `../public/images/${chapterNum}_${filename}`),
        })
        .then(() => {
            chapterObj.url.push(process.env.serverURL + "/images/" + `${chapterNum}_${filename}`)
        })
        .catch(err => { res.status(500).send() })
    })).then(() => {
        chapter.chapters.push(chapterObj)
        chapter.save()
    })

    res.send({ status: "ok" })
})

interface SearchQuery {
    title: string,
    genre: string
}

interface LatestUpdatedQuery {
    limit: number,
    page: number
}

interface MostViewedQuery {
    limit: number,
    page: number
}

interface ChapterObj {
    name: string,
    url: any
}

export default router;