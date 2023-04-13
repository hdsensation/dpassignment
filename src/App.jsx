/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
// import deepEqual from "deep-equal";
import "./Components/Styles/App.scss";

import Comment from "./Components/Comment";
import AddComment from "./Components/AddComment";

function App() {
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const getData = async () => {
    const res = await fetch("./data/data.json");
    const data = await res.json();
    updateComments(data.comments);
  };

  useEffect(() => {
    const data = localStorage.getItem("comments");
    if (data) {
      updateComments(JSON.parse(data));
    } else {
      getData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModalState]);

  // update score
  const updateScore = (score, id, type, method) => {
    const updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.score = score;
          data.voted = method === "upvote" ? true : false;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.score = score;
            data.voted = method === "upvote" ? true : false;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  // add comments
  const addComments = (newComment) => {
    const updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };

  // add replies
  const updateReplies = (replies, id) => {
    const updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if (data.id === id) {
        data.replies = [...replies];
      }
    });
    updateComments(updatedComments);
  };

  // edit comment
  const editComment = (content, id, type) => {
    const updatedComments = [...comments];
    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
          data.createdAt = new Date();
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.content = content;
            data.createdAt = new Date();
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  // delete comment
  const commentDelete = (id, type, parentComment) => {
    let updatedComments = [...comments];
    let updatedReplies = [];

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment.replies.filter((data) => data.id !== id);
          comment.replies = updatedReplies;
        }
      });
    }

    updateComments(updatedComments);
  };

  return (
    <main className="App">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          commentData={comment}
          updateScore={updateScore}
          updateReplies={updateReplies}
          editComment={editComment}
          commentDelete={commentDelete}
          setDeleteModalState={setDeleteModalState}
        />
      ))}
      <AddComment buttonValue="send" addComments={addComments} />
    </main>
  );
}

export default App;
