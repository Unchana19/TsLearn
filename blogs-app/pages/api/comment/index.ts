import dbConnect from "@/lib/dbConnect";
import { formatComment, isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { CommentResponse } from "@/utils/types";
import { isValidObjectId } from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST": return createNewComment(req, res);
    case "DELETE": return removeComment(req, res);
    case "PATCH": return updateComment(req, res);
    case "GET": return readComment(req, res);

    default: res.status(404).send("Not found!");
  }
}

const readComment: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuth(req, res);
  const { belongsTo } = req.query;
  if (!belongsTo || !isValidObjectId(belongsTo)) {
    return res.status(422).json({ error: "Invalid request" });
  }

  const comments = await Comment.find({ belongsTo }).populate({
    path: "owner",
    select: "name avatar",
  })
    .populate({
      path: "replies",
      populate: {
        path: "owner",
        select: "name avatar",
      }
    }).select("createdAt likes content repliedTo chiefComment");

  if (!comments) return res.json(comments);
  const formattedComment: CommentResponse[] = comments.map(comment => ({
    ...formatComment(comment, user),
    replies: comment.replies?.map((c: any) => formatComment(c, user)),
  }))
  res.json({ comments: formattedComment });
}

const createNewComment: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  //create comment
  await dbConnect();
  const { belongsTo, content } = req.body;

  const post = await Post.findById(belongsTo);
  if (!post) return res.status(401).json({ error: "Invalid Post!" });

  const comment = new Comment({
    content,
    belongsTo,
    owner: user.id,
    chiefComment: true,
  });

  await comment.save();
  const commentWithOwner = await comment.populate("owner")
  res.status(201).json({ comment: formatComment(commentWithOwner, user) });
}

const removeComment: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId)) return res.status(422).json({ error: "Invalid request!" });
  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  });

  if (!comment) return res.status(404).json({ error: "Comment not found!" });

  if (comment.chiefComment) {
    await Comment.deleteMany({
      repliedTo: commentId
    });
  } else {
    const chiefComment = await Comment.findById(comment.repliedTo);

    if (chiefComment?.replies?.includes(commentId as any)) {
      chiefComment.replies = chiefComment.replies.filter(cId => cId.toString() === commentId);

      await chiefComment.save();
    }
  }

  await Comment.findByIdAndDelete(commentId);
  res.json({ removed: true });
}

const updateComment: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId)) return res.status(422).json({ error: "Invalid request!" });
  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  }).populate("owner");

  if (!comment) return res.status(404).json({ error: "Comment not found!" });

  comment.content = req.body.content;
  await comment.save();

  res.json({ comment: formatComment(comment, user) });
}

export default handler;