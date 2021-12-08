import React, { Component, useEffect, useState } from "react";
import "../MainPage/MainPage.css";
import Post from "../Post/Post.js";
import uploadimg from "../../images/uploadicon.jpg";
import thoughticon from "../../images/thoughticon.jpg.png";
import annocicon from "../../images/announcement.jpg.png";
import { fetchHomePagePostlink } from "../../URL/Url";
import { Link } from "react-router-dom";
const MainPage =()=> {

    
    const [fetchedItems,setFetchedItems] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
 
        const fetchPosts = async()=>{
            setIsLoading(true);
            const response = await fetch(fetchHomePagePostlink);

            if(!response.ok){
                    throw new Error("Error in fetching posts");
            }

            const data = await response.json();
            setIsLoading(false);
            setFetchedItems(data);
            console.log(data);
        }

        try {
            fetchPosts().catch(error=>{console.log(error.message);
            setIsLoading(false);
            })
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }

      
    },[])

    if(isLoading){
        return <p>fetching posts...</p>
    }
  
  
    return (
      <div>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "15rem" }}>
              {/*Upload using the firebase*/}

              <Link to={{
              pathname:"/upload",
            
            }}>
              <img className="post_upload" src={uploadimg} alt="upload" />
              </Link>
              
              <div className="upload_text">Uploads! </div>
            </div>

            <div style={{ marginLeft: "5rem" }}>
              {/*Upload using the firebase*/}
            
              <img
                className="post_upload"
                src={thoughticon}
                style={{ marginLeft: "1.1rem" }}
                alt="upload"
              />
              
              <div className="upload_text">Thoughts! </div>
            </div>

            <div style={{ marginLeft: "5rem" }}>
              {/*Upload using the firebase*/}

              <img
                className="post_upload"
                src={annocicon}
                style={{ marginLeft: "2rem" }}
                alt="upload"
              />
              <div className="upload_text">Announcements! </div>
            </div>
          </div>

          {fetchedItems.map((item, index) => (
            <Post
              key={item.postId}
              id={item.postId}
              user={item.postUsername}
              postimage={item.postUrl}
              profileImage={item.postUserProfilePicUrl}
              postcaption ={item.postCaption}
              likes={item.likes}
              hashtags={item.hashtags}              comments={item.comments}
              time = {item.postedTime}
            />
          ))}
        </div>
      </div>
    );
  }

export default MainPage;
