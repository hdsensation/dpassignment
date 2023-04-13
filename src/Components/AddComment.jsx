/* eslint-disable react/prop-types */
import React, { useState } from "react";

import "./Styles/AddComment.scss";

function AddComment({
  buttonValue,
  addComments,
  replyingTo,
  handleTextareaClose,
}) {
  const replyingToUser = replyingTo ? `@${replyingTo}, ` : "";
  const [comment, setComment] = useState(replyingToUser);
  const clickHandler = () => {
    if (comment === "" || comment === " ") return;

    const newComment = {
      id: Math.floor(Math.random() * 100) + 5,
      content: replyingToUser + comment.replace(replyingToUser, ""),
      createdAt: new Date(),
      score: 0,
      username: "juliusomo",
      currentUser: true,
      replies: [],
    };

    addComments(newComment);
    setComment("");
  };

  return (
    <div className="add-comment">
      <div className="profile-pic" />
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className="send-btn-container">
        <div className="profile-pic" />
        <div
          style={{ display: "flex", flexDirection: "column", margin: "2px" }}
        >
          <button type="button" className="add-btn" onClick={clickHandler}>
            {buttonValue}
          </button>
          {buttonValue === "reply" ? (
            <button type="button" className="cancel-btn" onClick={() => handleTextareaClose()}>
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddComment;
