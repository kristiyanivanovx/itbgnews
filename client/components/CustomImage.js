import React from 'react';
import {useState} from 'react';
import {useRef} from "react"
import axios from "axios"

const CustomImage = ({image, userId, ENDPOINT}) => {
  const inputFile = useRef(null)
  const [currentImage, setCurrentImage] = useState(image)
  const [showButton, setShowButton] = useState(false)
  const [fileInformation , setFileInformation] = useState(null)

  const onButtonClick = () => {
    inputFile.current.click();
    setShowButton(() => true)
  };


  function onSubmit(ev) {
    ev.preventDefault()
    const files = inputFile.current.files
    if (files.length === 0) {
      inputFile.current.click();
      return
    }
    const data = new FormData()
    data.append("image", files[0])
    setFileInformation(() => data)
    setShowButton(() => false)
    delete inputFile.current.files
    const response = axios.post(`localhost:50003е1//my-profile/image`, fileInformation, {
      headers: { "Content-Type": "multipart/form-data" }})
  }

  return (
    <div>
      <form  method="POST" onSubmit={onSubmit}>
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
        {showButton ? <button>Upload</button> : null}
      </form>
    </div>
  )
};

export default CustomImage;