import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { fetchHashtagPostsLink } from "../../URL/Url";
import HashtagPost from "./HashtagPost";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import "./HashtagPosts.css";
const HashtagPosts = props => {

    const location = useLocation();
    const history = useHistory();
    const params = location.state;
    if(!params){
       history.goBack();
    }
    const tag = params.tagName;
    const [isLoading,setIsLoading] = useState(false);
    const [fetchedHashtagPosts,setFecthedhashtagPosts] = useState([]);
    useEffect(()=>{
        const fetchHashtagPosts = async() =>{
            const response = await fetch(fetchHashtagPostsLink+`/${tag}`);
            if(!response.ok){
                throw new Error("error while fetching");
            }
            const data = await response.json();
            console.log(data);
            setFecthedhashtagPosts(data);
        }

        try {

            fetchHashtagPosts().catch(error=>console.log(error.message))
            
        } catch (error) {
            console.log(error.message);
        }
    },[])

    if(isLoading){
        return <p>loading...</p>
    }

    

    return <div className="hashtag-posts-page">

<NavBar />



<div className="mainDiv">

<h2> showing results for <i style={{color:"blue"}}> #{tag} </i> </h2>

<div className="postsDiv">

{fetchedHashtagPosts.map((item) => {

return (

<Post

key={item.postId}

id={item.postId}

user={item.postUsername}

postimage={item.postUrl}

profileImage={item.postUserProfilePicUrl}

postcaption={item.postCaption}

likes={item.likes}

comments={item.comments}

time={item.postedTime}

hashtags={item.hashtags}

/>

);

})}

</div>

</div>

</div>
};

export default HashtagPosts;