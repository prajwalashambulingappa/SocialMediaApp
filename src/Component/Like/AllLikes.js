import { useEffect, useState } from "react";
import { allLikesLink } from "../../URL/Url";
import AllLikesModal from "./AllLikesModal";

const AllLikes = (props) => {
  const [fetchedLikes, setFetchedLikes] = useState([]);
  const postId = props.postId;


  useEffect(() => {
    const fetchAllComments = async () => {
      const response = await fetch(allLikesLink + `/${postId}`);

      const data = await response.json();

      setFetchedLikes(data);
      //console.log(data);
    };

    try {
      fetchAllComments();
    } catch (error) {}
  }, [postId]);

  //console.log('fetchedreviews:',fetchedReviews);

  return (
    <div>
      <AllLikesModal likes={fetchedLikes} close={props.closeLikesModal} open={true} />
    </div>
  );
};

export default AllLikes;
