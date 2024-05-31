import { isAdmin } from "@/lib/utils";
import Comment from "@/models/Comment";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET": return readLatestComment(req, res);

    default: res.status(404).send("Not found!");
  }
}

const readLatestComment: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Unauthoreized user!" })

  const limit = 5;

  const comments = await Comment.find({ chiefComment: true })
    .populate("owner")
    .limit(limit)
    .sort("-createdAt")
    .populate({
      path: "belongsTo",
      select: "title slug",
    });

  console.log(comments);

  const latestComment = comments.map((comment: any) => ({
    id: comment._id,
    content: comment.content,
    owner: {
      id: comment.owner._id,
      name: comment.owner.name,
      avatar: comment.owner.avatar
    },
    belongsTo: {
      id: comment.belongsTo._id,
      title: comment.belongsTo.title,
      slug: comment.belongsTo.slug,
    }
  }))

  res.json({ comments: latestComment });
}

export default handler;