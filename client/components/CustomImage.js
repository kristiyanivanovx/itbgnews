import React from 'react';
import styles from '../styles/Form.module.css';


async function imageUpload(ev) {
  const files = ev.target.files
  const data = new FormData()
  data.append("file" , files[0])
  data.append("upload_preset", "darwin")
  const responce = await fetch("//n", {
    method : "POST",
    body : data
  })
  const file =  await  responce.json()

}


function revealButton(){
    return (
      <button onClick={imageUpload}>Click here to upload</button>

    )
}

const CustomImage = () => {
  return (
    <input type="file" onClick={revealButton}/>
  )
};

export default CustomImage;



