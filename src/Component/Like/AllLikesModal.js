import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');


const AllLikesModal = (props) => {

  const [modalIsOpen, setIsOpen] = useState(props.open);

  const fetchedLikes = props.likes;

  function closeModal() {
    setIsOpen(false);
    props.close();
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {fetchedLikes.map((like) => {
        return (
          <div key={like.id}>
             <img src={like.likeUserProfilePicUrl} alt="liked user's profile pic"/>
             <p> {like.likeUsername}</p>
             <p> {like.likeUserEmail}</p>
             <hr />
          </div>
        );
      })}
    </Modal>
  );
};

export default AllLikesModal;
