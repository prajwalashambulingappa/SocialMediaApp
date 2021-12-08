import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { fetchHashtagPostsLink } from "../../URL/Url";
import HashtagPost from "./HashtagPost";


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

    

    return <div>

        {
            fetchedHashtagPosts.map(item=>{
                return <HashtagPost 
                 
              key={item.postId}
              id={item.postId}
              user={item.postUsername}
              postimage={item.postUrl}
              postcaption ={item.postCaption}
              likes={item.likes}
              comments={item.comments}
              time = {item.postedTime}
              hashtags={item.hashtags}
                
                />
            })
        }

    </div>
};

export default HashtagPosts;