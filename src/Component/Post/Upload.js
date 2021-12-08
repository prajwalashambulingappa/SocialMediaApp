import { useState } from  "react" ;
import storage from "../firebase";


const Upload = (props) =>{
    const [imagesAsFiles, setImagesAsFiles] = useState(null);
    const [imagesAsUrl, setImagesAsUrl] = useState([]);
    const realUrls = [];
  
    console.log(imagesAsFiles);
    console.log(imagesAsUrl);
    for (const url in imagesAsUrl) {
      console.log(url);
      if (url !== 0) {
        realUrls.push(imagesAsUrl[url]);
      }
    }
    const filesInputHandler = (event) => {
      //console.log(event);
      setImagesAsFiles(event.target.files);
    };
  
    const formSubmitHandler = (event) => {
      event.preventDefault();
  
      for (const file in imagesAsFiles) {
        console.log(file, "type: ", typeof file);
  
        if (file.length !== 1) {
          continue;
        }
  
        if (!imagesAsFiles[file].name) {
          continue;
        }
  
        console.log(imagesAsFiles[file]);
  
        const uploadTask = storage
          .ref(`/images/${imagesAsFiles[file].name}`)
          .put(imagesAsFiles[file]);
        //const uploadTask = storage.ref(`/vendor/item-images/${imagesAsFiles[file].name}`).put(imagesAsFiles[file]);
  
        uploadTask.on(
          "state_changed",
          (snapShot) => {
            console.log(snapShot);
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            storage
              .ref("/images")
              .child(imagesAsFiles[file].name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                console.log(fireBaseUrl);
                setImagesAsUrl((prevState) => [...prevState, fireBaseUrl]);
              });
          }
        );
      }
  
      // imagesAsFiles.map(file => {
      // }
      //
    };
    console.log(realUrls);
    return (
      <div className="App">
        <h1>Welcome</h1>
        <form onSubmit={formSubmitHandler}>
          <input
            type="file"
            multiple
            required
            accept="image/png, image/jpeg , video/mp4"
            onChange={filesInputHandler}
          />
          <button type="submit">Submit</button>
        </form>
        {realUrls.map((url) => (
          <img
            key={url}
            src={url}
            alt="item"
            style={{ height: "30rem", width: "30rem", margin: "2rem" }}
          />
        ))}
      </div>
    )
}

export default Upload;