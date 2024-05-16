import { Schema, models, model } from "mongoose";
//title, content, slug, tags, thumbnail, meta, author, date

const PostSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      require: true,
      trim: true,
    },
    meta: {
      type: String,
      require: true,
      trim: true,
    },
    tags: {
      type: [String],
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = models?.Post || model("Post", PostSchema);
export default Post;
