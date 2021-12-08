import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { allCommentsLink } from "../../URL/Url";


const AllComments = () => {
  const [fetchedReviews , setFetchedReviews] = useState([]);
    const location = useLocation();
    const params = location.state;
    const history = useHistory();
    if(!params){
        history.goBack();
    }

    const postId = params.postId;

    

    useEffect(()=>{

        const fetchAllComments = async () => {
            const response =  await fetch(allCommentsLink+`/${postId}`);

            const data = await response.json();


            setFetchedReviews(data);
            console.log(data);
        }

        try {
            fetchAllComments();
        } catch (error) {
            
        }
    },[postId])


    return (
        <div>
           {
               fetchedReviews.map( comment => {
                   <div key={comment.id}>
                        <h3>{comment.commentedUserEmail}</h3>
                         <p> {comment.comment} </p>
                       </div>
               } )
           }
        </div>
    )
};


export default AllComments;