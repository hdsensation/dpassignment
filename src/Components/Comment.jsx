/* eslint-disable react/prop-types */
import React, { useState } from "react";

import "./Styles/Comment.scss";

import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";
import DeleteModal from "./DeleteModal";
import CommentHeader from "./commentParts/CommentHeader";
import CommentFooter from "./commentParts/CommentFooter";
import CommentVotes from "./commentParts/CommentVotes";

function Comment({
  commentData,
  updateScore,
  updateReplies,
  editComment,
  commentDelete,
  setDeleteModalState,
}) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  const addReply = (newReply) => {
    const replies = [...commentData.replies, newReply];
    updateReplies(replies, commentData.id);
    setReplying(false);
  };

  const updateComment = () => {
    editComment(content, commentData.id, "comment");
    setEditing(false);
  };

  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : commentData.id;
    commentDelete(finalId, finalType, commentData.id);
    setDeleting(false);
  };

  const handleTextareaClose = () => setReplying(false);

  return (
    <div
      className={`comment-container ${
        commentData.replies[0] !== undefined ? "reply-container-gap" : ""
      }`}
    >
      <div className="comment">
        <CommentVotes
          updateScore={updateScore}
          commentData={commentData}
          type="comment"
        />
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            replying={replying}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
            updatedTime={commentData}
          />
          {!editing ? (
            <div className="comment-content">{commentData.content}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
          {editing && (
            <button
              type="button"
              className="update-btn"
              onClick={updateComment}
            >
              update
            </button>
          )}
        </div>
        <CommentFooter
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
          type="comment"
        />
        {" "}
      </div>

      {replying && (
        <AddComment
          buttonValue="reply"
          addComments={addReply}
          replyingTo={commentData.username}
          handleTextareaClose={handleTextareaClose}
        />
      )}
      {commentData.replies !== [] && (
        <ReplyContainer
          key={commentData.replies.id}
          commentData={commentData.replies}
          updateScore={updateScore}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}

      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
}

export default Comment;
