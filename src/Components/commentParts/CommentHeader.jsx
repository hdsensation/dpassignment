/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

// eslint-disable-next-line import/extensions
import commentPostedTime from "../../utils/time.js";

import CommentBtn from "./CommentBtn";

function CommentHeader({
  commentData,
  replying,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const createdAt = new Date(commentData.createdAt);
    const today = new Date();
    const differenceInTime = today.getTime() - createdAt.getTime();
    setTime(commentPostedTime(differenceInTime));
  }, [commentData.createdAt]);
  return (
    <div className="comment--header">
      <div className={`profile-pic ${commentData.username}`} />
      <div className="username">{commentData.username}</div>
      {commentData.currentUser ? <div className="you-tag">you</div> : ""}
      <div className="comment-posted-time">{`${time} ago`}</div>
      <CommentBtn
        commentData={commentData}
        replying={replying}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
}

export default CommentHeader;
