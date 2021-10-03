import React from 'react';
import {useState} from 'react';
import {useRef} from "react"
import ensureValidCookie from "../utilities/ensureValidCookie";

const CustomImage = ({image, accessToken}) => {
    const inputFile = useRef(null)
    const [currentImage, setCurrentImage] = useState(image)
    const [showButton, setShowButton] = useState(false)
    const onButtonClick = () => {
        inputFile.current.click();
        setShowButton(() => true)
    };


    async function onSubmit(ev) {
        ev.preventDefault()
        const files = inputFile.current.files
        if (files.length === 0) {
            inputFile.current.click();
            return
        }
        const data = new FormData()
        data.append("image", files[0])
        setShowButton(() => false)
        delete inputFile.current.files
        const response = await fetch(`http://localhost:5000/my-profile/image`, {
                method: "POST",
                body: data,
                headers: {
                    authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
                }
            }
        )
        if (response.status === 200) {
            const {img} = await response.json()
            console.log(img)
            setCurrentImage(() => img)
        }
    }

    return (
        <div>
            <form method="POST" onSubmit={onSubmit}>
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