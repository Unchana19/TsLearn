import dbConnect from "@/lib/dbConnect";
import { isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/Comment";
import { isValidObjectId } from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST": return updateLike(req, res);

    default: res.status(404).send("Not found!");
  }
}

const updateLike: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const { commentId } = req.body;
  if (!isValidObjectId(commentId)) return res.status(422).json({ error: "Invalid comment id!" });

  await dbConnect();

  const comment = await Comment.findById(commentId);

  if (!comment) return res.status(422).json({ error: "Comment not found!" });

  const oldLikes = comment.likes || [];
  const likedBy = user.id as any;

  //like and unlike
  //for unlike
  if (oldLikes.includes(likedBy)) {
    comment.likes = oldLikes.filter(like => like.toString() !== likedBy.toString());
  } else {
    //this is to like comment
    comment.likes = [...oldLikes, likedBy];
  }
  await comment.save();
  res.status(201).json({ comment });
}

export default handler;