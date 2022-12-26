import mongoose from "mongoose";
const { Schema } = mongoose;

const comic_chapterSchema = new Schema({
    comic: {
        type: Schema.Types.ObjectId,
        ref: "comic"
    },
    chapters: [{
        name: String,
        url: [String],
    }, {timestamps: true}],
})

export default mongoose.model("Chapters", comic_chapterSchema)