import { FC, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { GithubAuthButton } from "../button/GithubAuthButton";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { CommentResponse } from "@/utils/types";
import CommentCard from "./CommentCard";
import ConfirmModal from "./ConfirmModal";
import PageNavigator from "./PageNavigator";

interface Props {
  belongsTo?: string;
  fetchAll?: boolean;
}

const limit = 5;
let currentPageNo = 0;

const Comments: FC<Props> = ({ belongsTo, fetchAll }): JSX.Element => {
  const [comments, setComments] = useState<CommentResponse[]>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busyCommentLike, setBusyCommentLike] = useState(false);
  const [reachedToEnd, setReachToEnd] = useState(false);
  const [commentTodelete, setCommentToDelete] =
    useState<CommentResponse | null>(null);

  const userProfile = useAuth();

  const insertNewReplyComment = (reply: CommentResponse) => {
    if (!comments) return;
    let updatedComments = [...comments];
    const cheifCommentIndex = updatedComments.findIndex(
      ({ id }) => id === reply.repliedTo
    );

    const { replies } = updatedComments[cheifCommentIndex];

    if (replies) {
      updatedComments[cheifCommentIndex].replies = [...replies, reply];
    } else {
      updatedComments[cheifCommentIndex].replies = [reply];
    }

    setComments([...updatedComments]);
  };

  const updateEditedComment = (newComment: CommentResponse) => {
    if (!comments) return;

    let updatedComments = [...comments];

    if (newComment.chiefComment) {
      const index = updatedComments.findIndex(({ id }) => id === newComment.id);
      updatedComments[index].content = newComment.content;
    } else {
      const cheifCommentIndex = updatedComments.findIndex(
        ({ id }) => id === newComment.repliedTo
      );

      let newReplies: any = updatedComments[cheifCommentIndex].replies;
      newReplies?.map((comment: CommentResponse) => {
        if (comment.id === newComment.id) {
          comment.content = newComment.content;
        }
      });

      updatedComments[cheifCommentIndex].replies = newReplies;
    }

    setComments([...updatedComments]);
  };

  const updateDeletedComments = (deletedComment: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    if (deletedComment.chiefComment) {
      newComments = newComments.filter(({ id }) => id !== deletedComment.id);
    } else {
      const cheifCommentIndex = newComments.findIndex(
        ({ id }) => id === deletedComment.repliedTo
      );
      const newReplies = newComments[cheifCommentIndex].replies?.filter(
        ({ id }) => id !== deletedComment.id
      );
      newComments[cheifCommentIndex].replies = newReplies;
    }

    setComments([...newComments]);
  };

  const updateLikedComments = (likedComments: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    if (likedComments.chiefComment) {
      newComments = newComments.map((comment) => {
        if (comment.id === likedComments.id) return likedComments;
        return comment;
      });
    } else {
      const cheifCommentIndex = newComments.findIndex(
        ({ id }) => id === likedComments.repliedTo
      );
      const newReplies = newComments[cheifCommentIndex].replies?.map(
        (reply) => {
          if (reply.id === likedComments.id) return likedComments;
          return reply;
        }
      );
      newComments[cheifCommentIndex].replies = newReplies;
    }

    setComments([...newComments]);
  };

  const handleNewCommentSubmit = async (content: string) => {
    const newComment = await axios
      .post("/api/comment", { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
  };

  const handleReplySubmit = async (replyComment: {
    content: string;
    repliedTo: string;
  }) => {
    axios
      .post("api/comment/add-reply", replyComment)
      .then(({ data }) => {
        insertNewReplyComment(data.comment);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateSubmit = async (content: string, id: string) => {
    axios
      .patch(`api/comment?commentId=${id}`, { content })
      .then(({ data }) => {
        updateEditedComment(data.comment);
      })
      .catch((err) => console.log(err));
  };

  const handleOnDeleteClick = (comment: CommentResponse) => {
    setCommentToDelete(comment);
    setShowConfirmModal(true);
  };

  const handleOnDeleteCancel = () => {
    setCommentToDelete(null);
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = () => {
    if (!commentTodelete) return;
    axios
      .delete(`/api/comment?commentId=${commentTodelete.id}`)
      .then(({ data }) => {
        if (data.removed) {
          updateDeletedComments(commentTodelete);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCommentToDelete(null);
        setShowConfirmModal(false);
      });
  };

  const handleOnLikeClick = (comment: CommentResponse) => {
    setBusyCommentLike(true);
    axios
      .post("/api/comment/update-like", { commentId: comment.id })
      .then(({ data }) => {
        updateLikedComments(data.comment);
        setBusyCommentLike(false);
      })
      .catch((err) => {
        console.log(err);
        setBusyCommentLike(false);
      });
  };

  const fetchAllComments = async (pageNo = currentPageNo) => {
    try {
      const { data } = await axios.get(
        `/api/comment/all?pageNo=${pageNo}&limit=${limit}`
      );

      if (!data.comments.length) {
        currentPageNo--;
        return setReachToEnd(true);
      }

      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo++;
    fetchAllComments(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachToEnd(false);
    currentPageNo--;
    fetchAllComments(currentPageNo);
  };

  useEffect(() => {
    if (!belongsTo) return;
    axios
      .get(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, [belongsTo]);

  useEffect(() => {
    if (!belongsTo && fetchAll) {
      fetchAllComments();
    }
  }, [belongsTo, fetchAll]);

  return (
    <div className="py-20 space-y-4">
      {userProfile ? (
        <CommentForm
          visible={!fetchAll}
          onSubmit={handleNewCommentSubmit}
          title="Add comment"
        />
      ) : (
        <div className="flex flex-col items-end space-y-2">
          <h3 className="text-secondary-dark text-xl font-semibold">
            Log in to add comment
          </h3>
          <GithubAuthButton />
        </div>
      )}

      {comments?.map((comment) => {
        const { replies } = comment;
        return (
          <div key={comment.id}>
            <CommentCard
              comment={comment}
              showControlls={userProfile?.id === comment.owner.id}
              onReplySubmit={(content) => {
                handleReplySubmit({ content, repliedTo: comment.id });
              }}
              onUpdateSubmit={(content) => {
                handleUpdateSubmit(content, comment.id);
              }}
              onDeleteClick={() => handleOnDeleteClick(comment)}
              onLikeClick={() => handleOnLikeClick(comment)}
              busy={busyCommentLike}
            />

            {replies?.length ? (
              <div className="w-[93%] ml-auto">
                <h1 className="text-secondary-dark mb-3">Replies</h1>
                {replies?.map((reply) => {
                  return (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      showControlls={userProfile?.id === comment.owner.id}
                      onReplySubmit={(content) => {
                        handleReplySubmit({ content, repliedTo: comment.id });
                      }}
                      onUpdateSubmit={(content) => {
                        handleUpdateSubmit(content, reply.id);
                      }}
                      onDeleteClick={() => handleOnDeleteClick(reply)}
                      onLikeClick={() => handleOnLikeClick(reply)}
                      busy={busyCommentLike}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}

      {fetchAll ? (
        <div className="py-10 flex justify-center">
          <PageNavigator
            onPrevClick={handleOnPrevClick}
            onNextClick={handleOnNextClick}
          />
        </div>
      ) : null}

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this comment and replies if this is cheif comments!"
        onCancel={handleOnDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
      />
    </div>
  );
};

export default Comments;
