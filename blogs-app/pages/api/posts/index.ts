import dbConnect from "@/lib/dbConnect";
import { readFile } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: { bodyParser: false },
};

interface postData {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags?: string[];
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      await dbConnect();
      res.json({ ok: true });
    }
    case "POST":
      return createNewPost(req, res);
  }
};

const createNewPost: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { files, body } = await readFile(req) as {
    files: any, body: postData
  };

  let tags: string[] = [];

  //convert tags to array
  if (body.tags) tags = JSON.parse(body.tags as unknown as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, slug, meta } = body as postData;

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

  await newPost.save();

  res.json({ post: newPost });
};

export default handler;
