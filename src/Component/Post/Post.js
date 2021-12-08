import { useContext, useEffect, useState } from "react";
import "../Post/Post.css";
import Avatar from "@mui/material/Avatar";
import like from "../../images/postlike.jpg";
import comment from "../../images/postcomment.jpg";
import { Link } from "react-router-dom";
import AllComments from "../Comments/AllComments";
import ReactRoundedImage from "react-rounded-image";
import AllLikes from "../Like/AllLikes";
import { addLikeToPostLink, checkPostIsLikedLink, deleteLikePostLink } from "../../URL/Url";
import AppAuthContext from "../../context/app-auth-context";
import CommentInput from "../Comment/CommentInput";

const Post = (props) => {
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";
  const [commentsButtonClicked, setCommentsButtonClicked] = useState(false);
  const [likesButtonClicked, setLikesButtonClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes,setNumLikes] = useState(props.likes);
  const appCtx = useContext(AppAuthContext);
  const [numComments,setNumComments]=useState(props.comments);

  useEffect(() => {
    const checkThisPostHasAlreadyBeenLiked = async () => {
      const response = await fetch(
        checkPostIsLikedLink +
          `/${appCtx.token["socialMediaAppCookie"]}/${props.id}`
      );

      if (!response.ok) {
        throw new Error("check failed");
      }

      const data = await response.json();
      //console.log(data);
      if (data.status === 200) {
        setIsLiked(true);
      }
    };

    try {
      checkThisPostHasAlreadyBeenLiked().catch((error) =>
        console.log(error.message)
      );
    } catch (error) {
      console.log(error.message);
    }
  });

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

  const addCommentsHandler = () =>{
    setNumComments(prevComments=>prevComments+1);
  }

  const addLikeHandler = () => {
    //console.log("clicked");
    if (!isLiked) {
      fetch(addLikeToPostLink, {
        method: "POST",
        body: JSON.stringify({
          postId: props.id,
          likeUserEmail: appCtx.token["socialMediaAppCookie"],
          likeUsername: "--",
          likeUserProfilePicUrl: "",
        }),
        headers:{
          "Content-Type":"application/json"
        }
      }).then(response=>{
        if(!response.ok){
          throw new Error("error");
        }
        return response.json();
      }).then(data=>{
        //console.log(data);
        setIsLiked(true);
        setNumLikes(prevLikes=>prevLikes+1);

      })
    }
    if (isLiked) {
      fetch(deleteLikePostLink+`/${appCtx.token["socialMediaAppCookie"]}/${props.id}`,{
        method:"DELETE"
      }).then(response=>{
        if(!response.ok){
          throw new Error("error");
        }
        return response.json();
      }).then(data=>{
        //console.log(data);
        setIsLiked(false);
        setNumLikes(prevLikes=>prevLikes-1);
      })
    }
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
        <img className="post_image" src= {imageResourceUrl + props.profileImage} alt="post" />
        <div className="post_user">{props.user}</div>
      </div>

      {/* Image*/}
      <div className="imageDiv">
        <img
        
          src={postImageUrl}
          alt="post"
          
        />
      </div>

      <div className="Caption">{props.postcaption}</div>
      <div className="Caption">{props.time}</div>
      <div>
        {hashtags.map((tag) => {
          return (
            <span className="hashtag-span" key={tag}>
              {
                <Link
                  to={{
                    pathname: "/hashtag-posts",
                    state: {
                      tagName: tag,
                    },
                  }}
                >
                  {"#" + tag}
                </Link>
              }
            </span>
          );
        })}
      </div>

      {/* Like count */}
      <div>
        <div style={{ marginLeft: "1rem" }}>
          <img
            src={like}
            onClick={addLikeHandler}
            className={
              isLiked === true
                ? "post_reactimageinpostfile_liked"
                : "post_reactimageinpostfile"
            }
            alt="react"
          />
          <img src={comment} className="post_reactimage" alt="react" />
          {/* <img src= {share} className="post_reactimage" alt="react" /> */}
        </div>
        {numLikes === 0 ? (
          <p> 0 likes</p>
        ) : (
          <div className="dummy_likes">
            {numLikes} <button onClick={openLikesModal}>Likes </button>{" "}
          </div>
        )}

        {numComments === 0 ? (
          <p>
            {" "}
            <i>no comments yet</i>{" "}
          </p>
        ) : (
          <div className="dummy_likes">
            {numComments}{" "}
            <button onClick={openCommentsModal}> Comments </button>{" "}
          </div>
        )}

        {commentsButtonClicked && (
          <AllComments
            postId={props.id}
            closeCommentsModal={closeCommentsModal}
          />
        )}
        {likesButtonClicked && (
          <AllLikes postId={props.id} closeLikesModal={closeLikesModal} />
        )}
      </div>

      <CommentInput postId={props.id} updateNumComments={addCommentsHandler} />
    </div>
  );
};

export default Post;
