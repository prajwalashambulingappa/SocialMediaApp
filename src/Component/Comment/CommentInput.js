import { useContext, useState } from "react";
import AppAuthContext from "../../context/app-auth-context";
import { addnewCommentLink } from "../../URL/Url";

const CommentInput = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const appCtx = useContext(AppAuthContext);

  const formSubmithandler = (event) => {
    event.preventDefault();
    console.log(commentInput);
    if(commentInput.length<2){
        return;
    }
    fetch(addnewCommentLink, {
      method: "POST",
      body: JSON.stringify({
        postId: props.postId,
        comment: commentInput,
        commentTime: "",
        commentedUserEmail: appCtx.token["socialMediaAppCookie"] ,
        commentedUsername: "-",
        commentedUserProfilePicUrl: "-",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response=>{
        if(!response.ok){
            throw new Error("error");
        }
        return response.json();
    }).then(data=>{
        console.log(data);

        if(data){
        props.updateNumComments();
        setCommentInput('');
        }

    }).catch(error=>console.log(error.message));
  };

  return (
    <div>
      <form onSubmit={formSubmithandler}>
        <input
          type="text"
          className="post_commentbox"
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
          placeholder=" type in your comment.."
        />
         <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CommentInput;
