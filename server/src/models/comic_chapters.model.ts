import mongoose from "mongoose";
import comic from "./comic.model";

const { Schema } = mongoose;

const comic_chapterSchema = new Schema({
    chapters: [{
        name: String,
        url: [String],
    }],
})

export default mongoose.model("chapters", comic_chapterSchema)