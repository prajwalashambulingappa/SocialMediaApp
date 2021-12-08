import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { allCommentsLink } from "../../URL/Url";
import AllCommentsModal from "./AllCommentsModal";

const AllComments = (props) => {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const postId = props.postId;


  useEffect(() => {
    const fetchAllComments = async () => {
      const response = await fetch(allCommentsLink + `/${postId}`);

      const data = await response.json();

      setFetchedReviews(data);
      console.log(data);
    };

    try {
      fetchAllComments();
    } catch (error) {}
  }, [postId]);

  //console.log('fetchedreviews:',fetchedReviews);

  return (
    <div>
      <h1> All Comments </h1>
      <AllCommentsModal comments={fetchedReviews} close={props.closeCommentsModal} open={true} />
    </div>
  );
};

export default AllComments;
