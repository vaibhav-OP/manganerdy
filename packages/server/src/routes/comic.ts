import express from "express";
import comicSchema from "../models/comic.model";
import chpatersSchema from "../models/comic_chapters.model";

const router: express.Router = express.Router();

router.get("/most_viewed", async(req, res) => {
    const limit = 10,
        page = 0;

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

router.post("/latest_updated", async(req, res) => {
    const { limit, page } = req.body;

    try {
        const comicData = await comicSchema.find()
                                .select('title authorName profilePhotoLocation genre')
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

router.get("/latest_created", async(req, res) => {
    try {
        const comicData = await comicSchema.find()
                                .select('title profilePhotoLocation description')
                                .sort({createdAt: -1})
                                .limit(6)
                                .exec();

    if(!comicData) return res.send({ status: "error" });
    res.send({ status: "ok", data: comicData})
    } catch (error) {
        console.log(error)
        res.status(403).send({ status: "error" })
    }
})

router.post("/comic", async(req, res) => {
    const { id } = req.body;
    const chapter = new chpatersSchema()
    try {
        const comicData = await comicSchema.findById(id)
                                    .select('-view')
                                    .populate("chapters", "chapters.name")
                                    .exec();

        res.send({ status: "ok", data: comicData})
    } catch (err) {
        console.log("error", err)
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
        const comic = await comicSchema.findById(id)
        .select("title")
        .exec();

        res.send({ status: "ok", data: comic })
    } catch(e) {
        console.log(e)
        res.send({ status: "error" });
    }
})

interface Query {
  title: string,
  genre: string
}

router.get("/search", async(
        req: express.Request,
        res: express.Response
    ) => {
    let { title } = req.query as unknown as Query;

    if(!title) return res.send({ status: "error"});

    try {
        let comics = await comicSchema.find({ $text: { $search: title } })
                                        .select("title profilePhotoLocation authorName")
                                        .exec();

        res.send({ status: "ok", data: comics })
    } catch(e) {
        console.log("Error while searching for comic", e)
        res.send({ status: "error" })
    }
})

export default router;