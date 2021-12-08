import { useContext, useState } from "react";
import storage from "../firebase";
import { Carousel } from "react-responsive-carousel";
import classes from "./Upload.module.css";
import NavBar from "../NavBar/NavBar";
import { uploadNewPostLink } from "../../URL/Url";
import { useHistory } from "react-router-dom";
import AppAuthContext from "../../context/app-auth-context";

const Upload = (props) => {
  const [imagesAsFiles, setImagesAsFiles] = useState(null);
  const [imagesAsUrl, setImagesAsUrl] = useState([]);
  const [postCaptionInput, setPostCaptionInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const appCtx = useContext(AppAuthContext);
  const realUrls = [];

  //console.log(imagesAsFiles);
  //console.log(imagesAsUrl);
  for (const url in imagesAsUrl) {
    //console.log(url);
    if (url !== 0) {
      realUrls.push(imagesAsUrl[url]);
    }
  }
  const filesInputHandler = (event) => {
    //console.log(event);
    setImagesAsFiles(event.target.files);
  };

  const previewHandler = (event) => {
    for (const file in imagesAsFiles) {
      //console.log(file, "type: ", typeof file);

      if (file.length !== 1) {
        continue;
      }

      if (!imagesAsFiles[file].name) {
        continue;
      }

      //console.log(imagesAsFiles[file]);

      const uploadTask = storage
        .ref(`/images/${imagesAsFiles[file].name}`)
        .put(imagesAsFiles[file]);
      //const uploadTask = storage.ref(`/vendor/item-images/${imagesAsFiles[file].name}`).put(imagesAsFiles[file]);

      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //console.log(snapShot);
        },
        (error) => {
          //console.log(error.message);
        },
        () => {
          storage
            .ref("/images")
            .child(imagesAsFiles[file].name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              //console.log(fireBaseUrl);
              setImagesAsUrl((prevState) => [...prevState, fireBaseUrl]);
            });
        }
      );
    }
  };
  console.log("real urls", realUrls);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsSending(true);
    fetch(uploadNewPostLink, {
      method: "POST",
      body: JSON.stringify({
        userEmail: appCtx.token["socialMediaAppCookie"],
        postUsername: "--",
        postUserProfilePicUrl: " 12NXTFtzMH7LpHnMm4RmnLAbfyfzXyRxx",
        postType: "image",
        postUrl: realUrls[0],
        postCaption: postCaptionInput,
        postedTime: "",
        likes: 0,
        comments: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response=>{
      if(!response.ok){
        throw new Error("error");
      }
        return response.json();
      }
    )
    .then(data=>{
      console.log(data);
      setIsSuccess(true);
      setIsSending(false);
      const timer = setTimeout(()=>{

        setIsSuccess(false);
        history.push("/home");

        clearTimeout(timer);

      },1000)
    }).catch(error=>{
      console.log(error.message);
      setIsSuccess(false);
      setIsSending(false);
    });
  };

  if(isSending){
    return <p style={{textAlign:"center"}}>sending post data..</p>
  }

  if(isSuccess){
    return <p style={{textAlign:"center"}}>Post Uploaded</p>
  }

  return (
    <div className={classes.uploadPage}>
      <NavBar />

      <h1 style={{color:"white", fontWeight:"bold"}}>Share a moment...</h1>
      <p style={{color:"white", fontWeight:"bold", fontSize:"113%"}}>
        {" "}
        <i>
          {" "}
          You can upload an image or small video clip. Accepted
          types: image/png, image/jpeg, image/gif, video/mp4{" "}
        </i>{" "}
      </p>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.formField}>
          <input
          className="fileInputButton"
            type="file"
            required
            accept="image/png, image/jpeg , video/mp4, image/gif"
            onChange={filesInputHandler}
          />
        </div>
        <div className={classes.formField}>
          <textarea
            className={classes.captionInput}
            placeholder="enter caption or context hashtags.."
            onChange={(event) => setPostCaptionInput(event.target.value)}
            value={postCaptionInput}
          />
        </div>

        {realUrls.length > 0 && (
          <div>
            <p> preview.. </p>
            <Carousel showArrows stopOnHover showThumbs={false}>
              {realUrls.map((url) => (
                <div key={url} className="uploaded-images-div">
                  <img
                    src={url}
                    alt="item"
                    style={{ height: "30rem", width: "30rem", margin: "2rem" }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {realUrls.length == 0 && (
          <button className={classes.button} type="button" onClick={previewHandler}>
            Preview
          </button >
        )}
        {realUrls.length > 0 && <button className={classes.button} type="submit">Submit</button>}
      </form>
    </div>
  );
};

export default Upload;

