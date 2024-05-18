import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { formatPosts, readFile, readPostsFromDB } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import formidable from "formidable";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Incomingpost } from "./[postId]";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET": return readPosts(req, res)
    case "POST":
      return createNewPost(req, res);
  }
};

const createNewPost: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { files, body } = await readFile<Incomingpost>(req)

  let tags: string[] = [];

  //convert tags to array
  if (body.tags) tags = JSON.parse(body.tags as unknown as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, slug, meta } = body;

  await dbConnect();
  const alreadyExists = await Post.findOne({
    slug
  });
  if (alreadyExists) return res.status(400).json({ error: "Slug need to be unique!" });

  //create new post
  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  const thumbnail = files.thumbnail as unknown as formidable.File;

  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(thumbnail.filepath, {
      folder: "dev-blogs"
    });
    newPost.thumbnail = { url, public_id };
  }

  await newPost.save();

  res.json({ post: newPost });
};

const readPosts: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { limit, pageNo } = req.query as { limit: string, pageNo: string };
    const posts = await readPostsFromDB(parseInt(limit), parseInt(pageNo));

    res.json({ posts: formatPosts(posts) });
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default handler;
