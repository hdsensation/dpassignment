/* eslint-disable react/prop-types */
import React from "react";
import CommentVotes from "./CommentVotes";
import CommentBtn from "./CommentBtn";

function CommentFooter({
  updateScore,
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
  type,
}) {
  return (
    <div className="comment--footer">
      <CommentVotes
        updateScore={updateScore}
        commentData={commentData}
        type={type}
      />

      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
}

export default CommentFooter;
