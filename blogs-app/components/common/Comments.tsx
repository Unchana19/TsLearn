import { FC, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { GithubAuthButton } from "../button/GithubAuthButton";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { CommentResponse } from "@/utils/types";
import CommentCard, { CommentOwnersProfile } from "./CommentCard";

interface Props {
  belongsTo: string;
}

const Comments: FC<Props> = ({ belongsTo }): JSX.Element => {
  const [comments, setComments] = useState<CommentResponse[]>();
  const userProfile = useAuth();

  const handleNewCommentSubmit = async (content: string) => {
    const newComment = await axios
      .post("/api/comment", { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
  };

  useEffect(() => {
    axios
      .get(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="py-20 space-y-4">
      {userProfile ? (
        <CommentForm onSubmit={handleNewCommentSubmit} title="Add comment" />
      ) : (
        <div className="flex flex-col items-end space-y-2">
          <h3 className="text-secondary-dark text-xl font-semibold">
            Log in to add comment
          </h3>
          <GithubAuthButton />
        </div>
      )}

      {comments?.map(({ id, owner, createdAt, content }) => {
        return (
          <div key={id}>
            <CommentCard
              profile={owner as CommentOwnersProfile}
              date={createdAt}
              content={content}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
