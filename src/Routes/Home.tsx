import styled from "styled-components";
import bg1 from "../img/1.jpg";
import bg2 from "../img/2.jpg";
import bg3 from "../img/3.jpg";
import bg4 from "../img/4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .Left {
    top: 50%;
    left: 3%;
    transform: translate(-50%, -50%);
    color: rgba(235, 235, 235, 0.3);
    &:hover {
      color: rgba(235, 235, 235, 0.5);
    }
  }
  .Right {
    top: 50%;
    left: 97%;
    transform: translate(-50%, -50%);
    color: rgba(235, 235, 235, 0.3);
    &:hover {
      color: rgba(235, 235, 235, 0.5);
    }
  }
`;

/* bg img slider */
const SlideBtn = styled.div`
  z-index: 100;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const IframeBox = styled.div`
  width: 100%;
  height: 14vw;
  display: flex;
  background-color: black;
  div {
    flex: 1;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const Iframe = ({ src }: { src: string }) => {
  return (
    <div>
      <iframe
        src={src}
        frameBorder={0}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

const IframeContainer = ({
  src1,
  src2,
  src3,
  src4,
}: {
  src1: string;
  src2: string;
  src3: string;
  src4: string;
}) => {
  return (
    <IframeBox>
      <Iframe src={src1} />
      <Iframe src={src2} />
      <Iframe src={src3} />
      <Iframe src={src4} />
    </IframeBox>
  );
};

function Home() {
  return (
    <>
      <Background>
        <SlideBtn
          className="Left"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={intervalHandler}
          onClick={() => slideHandler(-1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="4x" />
        </SlideBtn>
        <ImgContainer
          ref={slideRef}
          style={{
            width: `${100 * SLIDE_NUM}vw`,
            transition: "all 500ms ease-in-out",
            transform: `translateX(${
              -1 * ((100 / slideArr.length) * slideIndex)
            }%)`,
          }}
        >
          {slideArr.map((item, index) => (
            <ImgBox key={index}>
              <img src={item.img} />
            </ImgBox>
          ))}
        </ImgContainer>
        <SlideBtn
          className="Right"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={intervalHandler}
          onClick={() => slideHandler(+1)}
        >
          <FontAwesomeIcon icon={faChevronRight} size="4x" />
        </SlideBtn>
      </Background>
      <IframeContainer
        src1="https://www.youtube.com/embed/WUsjSMXHJXE?autoplay=1&mute=1&loop=1;"
        src2="https://www.youtube.com/embed/ZUnHFFSTPOY?autoplay=1&mute=1&loop=1;"
        src3="https://www.youtube.com/embed/PSPzam3fIrk?autoplay=1&mute=1&loop=1;"
        src4="https://www.youtube.com/embed/ri8Y1nrkiqk?autoplay=1&mute=1&loop=1;"
      />
    </>
  );
}

export default Home;
