import formidable from "formidable";
import { NextApiRequest } from "next";
import dbConnect from "./dbConnect";
import Post, { PostModelSchema } from "@/models/Post";
import { PostDetail } from "@/utils/types";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ files, body: fields as T });
    });
  });
};

export const readPostsFromDB = async (limit: number, pageNo: number) => {
  if (!limit || limit > 10) throw Error("Please use limit under 10 and a valid pageNo");
  const skip = limit * pageNo;
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: "desc" }).select("-content").skip(skip).limit(limit);

  return posts;
}

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map(post => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
  }));
}