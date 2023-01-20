import mongoose from "mongoose";
import chapters from "./comic_chapters.model";

const comicSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    profilePhotoLocation: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    genre: [String],
    chapters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chapters"
    },
    view: {
      type: Number,
      default: 0
    },
    timesUpdated: {
        type: Number,
        default: 0
    }
}, {
  timestamps: true
})

export default mongoose.model('comic', comicSchema)