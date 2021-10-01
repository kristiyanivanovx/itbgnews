import React from 'react';
import {useState} from 'react';
import {useRef} from "react"
import { CREATED_RESPONSE_CODE, getEndpoint } from '../utilities/common';
import axios from "axios"

const CustomImage = ({image, userId, ENDPOINT}) => {
  const inputFile = useRef(null)
  const [currentImage, setCurrentImage] = useState(image)
  const [showButton, setShowButton] = useState(false)

  const onButtonClick = () => {
    inputFile.current.click();
    setShowButton(() => true)
  };


  async function imageUpload() {
    const files = inputFile.current.files
    if (files.length === 0) {
      inputFile.current.click();
      return
    }
    const data = new FormData()
    data.append("image", files[0])
    setShowButton(() => false)
    delete inputFile.current.files
    const endpoint = getEndpoint()
    const response = await axios.post(`${endpoint}/my-profile/image`, data, {
    headers: { "Content-Type": "multipart/form-data" }})
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