import express from "express";
import comicModel from "../models/comic.model";
import comic from "../models/comic.model"

const router: express.Router = express.Router();

router.post("/most_viewed", async(req, res) => {
    const { limit, page } = req.body

    try {
        const data = await comic.find()
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

router.post("/latest_updated", async(req, res) => {
    const { limit, page } = req.body;

    try {
        const comicData = await comic.find()
                                .select('title authorName profilePhotoLocation')
                                .sort({updatedAt: -1})
                                .limit(limit)
                                .skip(limit * page)
                                .exec();

        if(!comicData) return res.send({ status: "error" });
        if(comicData.length == 0) return res.send({ status: "error", msg: "last array"})
        res.send({ status: "ok", data: comicData});
    } catch (error) {
        console.log(error)
        res.send({ status: "error" })
    }
});

router.post("/latest_created", async(req, res) => {
    try {
        const comicData = await comic.find()
                                .select('title profilePhotoLocation description')
                                .sort({createdAt: -1})
                                .limit(6)
                                .exec();

    if(!comicData) return res.send({ status: "error" });
    res.send({ status: "ok", data: comicData})
    } catch (error) {
        console.log(error)
        res.send({ status: "error" })
    }
})

router.post("/comic", async(req, res) => {
    const { id } = req.body;

    try {
        const comicData = await comic.findById(id)
                                    .select('-view')
                                    .exec();

        res.send({ status: "ok", data: comicData})
    } catch (err) {
        res.send({ status: "error" });
    }
})


router.post("/getchapter", async(req, res) => {
    const { id, name } = req.body;
    try {
        // const comicData = await comic.findById(id)
        //                                 .select('chapters title')
        //                                 .exec();
        // const chapter = comicData.chapters.find((chapter, index) => chapter.name === name)

        res.send({ status: "ok", data: { chapter: [], title: "comicData.title" } })
    } catch (err) {
        res.send({ status: "error" });
    }
})

router.get("/comic_name/:id", async(req,res) => {
    const { id } = req.params

    if(!id) return res.send({ status: "error" });

    try {
        const comic = await comicModel.findById(id)
        .select("title")
        .exec();

        res.send({ status: "ok", data: comic })
    } catch(e) {
        console.log(e)
        res.send({ status: "error" });
    }
})

interface Query {
  title: string;
}

router.get("/search", async(
        req: express.Request,
        res: express.Response
    ) => {
    const { title } = req.query as unknown as Query;

    if(!title) return res.send({ status: "error"});
    try {
        const comics = await comicModel.find({ title: { $regex: title, '$options' : 'i' } })
        .select("title profilePhotoLocation authorName")
        .exec();

        res.send({ status: "ok", data: comics })
    } catch(e) {
        console.log("Error while searching for comic", e)
        res.send({ status: "error" })
    }
})

export default router;
