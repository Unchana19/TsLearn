import cloudinary from "@/lib/cloudinary";
import { readFile } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import { Incomingpost } from "@/utils/types";
import formidable from "formidable";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "PATCH":
      return updatePost(req, res)
    case "DELETE":
      return removePost(req, res)
    default:
      res.status(404).send("Not found!");
  }
}

const removePost: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const postId = req.query.postId as string;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: "Post not found!" });

    // remove thumbnail from post
    const publicId = post.thumbnail?.public_id;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    res.json({ removed: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const updatePost: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.postId as string;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found!" });

  const { files, body } = await readFile<Incomingpost>(req);

  let tags: string[] = [];

  //convert tags to array
  if (body.tags) tags = JSON.parse(body.tags as unknown as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  const thumbnail = files.thumbnail as unknown as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(thumbnail.filepath, { folder: "dev-blogs" });

    const publicId = post.thumbnail?.public_id;
    if (publicId) await cloudinary.uploader.destroy(publicId);

    post.thumbnail = { url, public_id };
  }

  await post.save();
  res.json({ post });
}

export default handler