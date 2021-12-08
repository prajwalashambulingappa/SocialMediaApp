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


const AllCommentsModal = (props) => {

  const [modalIsOpen, setIsOpen] = useState(props.open);

  const fetchedComments = props.comments;

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
      {fetchedComments.map((comment) => {
        return (
          <div key={comment.id}>
            <h3>{comment.commentedUserEmail}</h3>
            <p> {comment.comment} </p>
            <p>{comment.commentTime}</p>
            <hr />
          </div>
        );
      })}
    </Modal>
  );
};

export default AllCommentsModal;
