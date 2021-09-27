import React from 'react';
import {useState} from 'react';
import {useRef} from "react"

const CustomImage = ({image, userId, ENDPOINT}) => {
  const inputFile = useRef(null)
  const [currentImage, setCurrentImage] = useState(image)
  const [showButton, setShowButton] = useState(false)
  const [file ,setFile] = useState(null)

  const onButtonClick = () => {
    inputFile.current.click();
    setShowButton(() => true)
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setCurrentImage(() => reader.result)
    };
  };

  async function imageUpload() {
    const files = inputFile.current.files
    if (files.length === 0) {
      inputFile.current.click();
      return
    }
    setFile(() => files[0])
    previewFile(file)
    const json = {
      userId,
      imageString: currentImage
    }
    setShowButton(() => false)
    setFile(() => null)

    await fetch(`http://localhost:5000/my-profile/image`, {
      method: "POST",
      body: JSON.stringify(json),
      headers: {'Content-Type': 'application/json'},
    })
  }

  return (
    <div>
      <form action="" encType="multipart/form-data" method="POST">
        <img src={currentImage}
             onClick={onButtonClick}
             alt="There is no image"
             style={{width: "100%"}}
             name="image"
        />
        <input type="file"
               ref={inputFile}
               style={{display: "none"}}
        />
        {showButton ? <button onClick={imageUpload}>Upload</button> : null}
      </form>
    </div>
  )
};

export default CustomImage;