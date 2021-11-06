import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import ensureValidCookie from '../utilities/ensureValidCookie';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Modal from './Modal';

const CustomImage = ({ image, accessToken }) => {
  const inputFile = useRef(null);
  const [currentImage, setCurrentImage] = useState(image);
  const [showButton, setShowButton] = useState(false);
  const ENDPOINT = useSelector((state) => state.infrastructure.endpoint);
  const [errorText , setErrorText] = useState("")
  const [shouldDisplay , setShouldDisplay] = useState(false)

  const onButtonClick = () => {
    inputFile.current.click();
    setShowButton(() => true);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const files = inputFile.current.files;
    if (files.length === 0) {
      inputFile.current.click();
      return;
    }

    const data = new FormData();
    data.append('image', files[0]);
    setShowButton(() => false);
    delete inputFile.current.files;

    // todo: use http service
    const response = await fetch(ENDPOINT + `/my-profile/image`, {
      method: 'POST',
      body: data,
      headers: {
        authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    });
    if (response.status === 405){
      let {message} = await response.json();
      setErrorText(() => message)
      setShouldDisplay(true)
    }
    if (response.status === 200) {
      const { img } = await response.json();
      setCurrentImage(() => img);
    }
  };

  return (
    <div>
      <Modal
        text={errorText}
        shouldDisplay={shouldDisplay}
        toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
      />
      <form method="POST" onSubmit={onSubmit}>
        <Image
          src={currentImage}
          onClick={onButtonClick}
          alt="There is no image"
          width={150}
          height={150}
          name="image"
        />

        <div>
          <input type="file" ref={inputFile} style={{ display: 'none' }} />
          {showButton ? (
            <button>
              <FontAwesomeIcon icon={faUpload} /> <span>Качи</span>
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default CustomImage;
