import React, { Component } from "react";
import "../Post/Post.css";
import Avatar from '@mui/material/Avatar';
import like from "../../images/postlike.jpg";
import comment from "../../images/postcomment.jpg";
import share from "../../images/postshare.jpg";
import { Link } from "react-router-dom";


const Post =(props) => {

//     // commentList:[]
//     // componentDidMount(){
//     //     this.getComments();
//     // }
    
//     const getComments=()=>{
//         let data=[
//             {
//                 "user":"abc",
//                 "commentid":"2873",
//                 "timestamp":"2642",
//                 "description":"Comment"
//             }
//         ];
//         this.setState({commentList: data});
//     }
console.log(props);
const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";
        return ( 
            <div className= "post_container">

                {/* Header */}
                <div className= "post_header">
                    <Avatar className="post_image" src={props.profileimage} alt="post" />
                    <div className="post_user">{props.user}</div>
                </div>

                {/* Image*/}
                <div>
                    <img src={imageResourceUrl+ props.postimage} alt="post" width="860rem" height="700rem" />
                    
                </div>

                <div className="Caption">
                    {props.postcaption}
                </div>
                <div className="Caption">
                    {props.time}
                </div>

                {/* Like count */}
                <div>
                    <div style ={{"marginLeft":"1rem"}}>
                        <img src= {like} className="post_reactimage" alt="react" />
                        <img src= {comment} className="post_reactimage" alt="react" />
                        {/* <img src= {share} className="post_reactimage" alt="react" /> */}
                    </div>
                    <div className="dummy_likes">
                        {props.likes} Likes
                    </div>
                    <div className="dummy_likes">
                        {props.comments} Comments
                    </div>

                    <Link  to={{
                        pathname:"/all-comments",
                        state:{
                            postId: props.id
                        }
                    }}> see all comments </Link>
                </div>

                {/* Comment section */}
                {/* <div>
                    {
                        this.state.commentList.map((item, index)=>(
                            <div key={item.id} className="dummy_comments"> 
                                <div> Comments: </div>
                                {item.user}: {item.description} 
                            </div>
                        ))
                    } */}
                    
                    <input text="text" className="post_commentbox" placeholder=" Add a comment.." />
                {/* </div> */}
            </div>
        );
   }

export default Post;