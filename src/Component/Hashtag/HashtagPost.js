import React, { Component, useState } from "react";
import "./HashtagPost.css"
import Avatar from "@mui/material/Avatar";
import like from "../../images/postlike.jpg";
import comment from "../../images/postcomment.jpg";
import share from "../../images/postshare.jpg";
import { Link } from "react-router-dom";
import AllComments from "../Comment/AllComments";

const HashtagPost = (props) => {
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";
  const [commentsButtonClicked, setCommentsButtonClicked] = useState(false);
  const [likesButtonClicked, setLikesButtonClicked] = useState(false);

  const closeCommentsModal = () => {
    setCommentsButtonClicked(false);
  };
  const closeLikesModal = () => {
    setLikesButtonClicked(false);
  };
  const openCommentsModal = () => {
    setCommentsButtonClicked(true);
  };
  const openLikesModal = () => {
    setLikesButtonClicked(true);
  };

  let hashtags = [];
  for (const tag in props.hashtags) {
    hashtags.push(props.hashtags[tag]);
  }

  let postImageUrl = "";
  let propsImageUrl="";
  propsImageUrl = props.postimage;
  if(propsImageUrl.startsWith("https:")){
    postImageUrl = propsImageUrl; 
  }else{
    postImageUrl = imageResourceUrl + propsImageUrl;
  }

  return (
    <div className="post_container">
      {/* Header */}
      <div className="post_header">
        <Avatar className="post_image" src={props.profileimage} alt="post" />
        <div className="post_user">{props.user}</div>
      </div>

      {/* Image*/}
      <div>
        <img
          src={postImageUrl}
          alt="post"
          width="860rem"
          height="700rem"
        />
      </div>

      <div className="Caption">{props.postcaption}</div>
      <div className="Caption">{props.time}</div>
      <div>
        {hashtags.map((tag) => {
          return (
            <span className="hashtag-span" key={tag}>
              {
              (
                <Link
                  to={{
                    pathname: "/hashtag-posts",
                    state: {
                      tagName: tag,
                    },
                  }}
                >
                  {'#'+tag}
                </Link>
              )}
            </span>
          );
        })}
      </div>

      {/* Like count */}
      <div>
        <div style={{ marginLeft: "1rem" }}>
          <img src={like} className="post_reactimage" alt="react" />
          <img src={comment} className="post_reactimage" alt="react" />
          {/* <img src= {share} className="post_reactimage" alt="react" /> */}
        </div>
        {props.likes === 0 ? (
          <p> 0 likes</p>
        ) : (
          <div className="dummy_likes">
            {props.likes} <button onClick={openLikesModal}>Likes </button>{" "}
          </div>
        )}

        {props.comments === 0 ? (
          <p>
            {" "}
            <i>no comments yet</i>{" "}
          </p>
        ) : (
          <div className="dummy_likes">
            {props.comments}{" "}
            <button onClick={openCommentsModal}> Comments </button>{" "}
          </div>
        )}

        {commentsButtonClicked && (
          <AllComments
            postId={props.id}
            closeCommentsModal={closeCommentsModal}
          />
        )}
      </div>

      <input
        text="text"
        className="post_commentbox"
        placeholder=" Add a comment.."
      />
    </div>
  );
};

export default HashtagPost;
