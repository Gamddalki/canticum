import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface PopupProps {
  popupUrl: string;
}

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const PopupContainer = styled.div`
  background: ${(props) => props.theme.footerColor};
  border-radius: 13px;
  width: 550px;
  padding: 15px;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

const PopupContent = styled.div`
  text-align: center;
  h2 {
    padding: 10px;
    font-weight: 500;
    font-size: 17px;
  }
  video {
    border-radius: 13px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 5px 0;
  button {
    color: ${(props) => props.theme.textColor};
  }
`;

function Popup({ popupUrl }: PopupProps) {
  const [isPopup, setPopup] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const lastClosedTime = localStorage.getItem("popupClosed");
    if (lastClosedTime) {
      const currentTime = new Date().getTime();
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

      if (
        currentTime - new Date(lastClosedTime).getTime() <
        twentyFourHoursInMilliseconds
      ) {
        setPopup(false);
      } else {
        // Delete popupClosed after 24hours
        localStorage.removeItem("popupClosed");
      }
    }
  }, []);

  const closePopup = () => {
    setPopup(false);
  };

  const closeForDay = () => {
    setPopup(false);
    localStorage.setItem("popupClosed", new Date().toString());
  };

  if (!isPopup) {
    return null;
  }

  return (
    <PopupBackground>
      <PopupContainer>
        <PopupContent>
          <video ref={videoRef} controls autoPlay muted loop>
            <source src={popupUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <ButtonContainer>
            <button onClick={closeForDay}>하루동안 보지 않기</button>
            <button onClick={closePopup}>닫기</button>
          </ButtonContainer>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
}

export default Popup;
