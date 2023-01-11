import mongoose from "mongoose";
import comic from "./comic.model";

const { Schema } = mongoose;

const comicChapterSchema = new Schema({
    chapters: [{
        name: String,
        url: [String],
    }],
})

export default mongoose.model("chapters", comicChapterSchema)