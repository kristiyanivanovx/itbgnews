import React from 'react';
import {useState} from 'react';
import {useRef} from "react"
import getUserToken from '../utilities/getUserToken';


const CustomImage = ({image, userId, ENDPOINT}) => {
  const inputFile = useRef(null)
  const [currentImage , setCurrentImage] = useState(image)

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const previewFile =  (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      setCurrentImage(() => reader.result)
    };
  };

  async function imageUpload(ev) {
    const files = inputFile.current.files
    previewFile(files[0])
    const json = {
      userId,
      imageString: currentImage
    }

    const response = await fetch(`http://localhost:5000/posts/my-profile/image`, {
      method: "POST",
      body: JSON.stringify(json),
      headers: {'Content-Type': 'application/json'},
    })
  }

  return (
    <div>
      <img src={currentImage}
           alt="There is no image"
           onClick={onButtonClick}
           style={{width: "100%"}}
      />
      <label htmlFor="image">
        <input type="file"
               name="image"
               id="image"
               ref={inputFile}
               style={{display: "none"}}
        />
      </label>

      <button onClick={imageUpload}>Upload</button>
    </div>
  )
};

export default CustomImage;