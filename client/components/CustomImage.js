import React from 'react';
import {useState} from 'react';
import {useRef} from "react"
import {useEffect} from "react"
import Modal from "../components/Modal"


const CustomImage = ({image}) => {
  const inputFile = useRef(null)

  const onButtonClick = () => {
    inputFile.current.click();
  };

  async function imageUpload(ev) {
    const files = inputFile.current.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "darwin")
    const response = await fetch("//n", {
      method: "POST",
      body: data
    })
    const file = await response.json()
  }

  return (
    <div>
      <img src={image}
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