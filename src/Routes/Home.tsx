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
import { PC, Mobile } from "../Components/Responsive";

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

const MoBackground = styled.div`
  width: 100vw;
  display: block;
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
  height: 100vh;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MoImgBox = styled(ImgBox)`
  height: 59vw;
`;

/* bg img Array */
const bgArr = [
  { img: bg1, key: 1 },
  { img: bg2, key: 2 },
  { img: bg3, key: 3 },
  { img: bg4, key: 4 },
];

/* useInterval Hook */
interface IUseInterval {
  (callback: () => void, interval: number): void;
}

const useInterval: IUseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (interval !== null && interval !== 10000000) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
};

/* youtube iframes */
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
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideInterval, setSlideInterval] = useState(6000); // slideInterval 6 secs

  const slideRef = useRef<HTMLDivElement>(null);

  const BG_NUM = bgArr.length;
  const beforeSlide = bgArr[BG_NUM - 1];
  const afterSlide = bgArr[0];

  let slideArr = [beforeSlide, ...bgArr, afterSlide]; // create slide array (last, origin(first,...,last) ,first) for infinite slide show
  const SLIDE_NUM = slideArr.length;

  useInterval(() => setSlideIndex((prev) => prev + 1), slideInterval); // auto slide show with slideInterval

  /* InfiniteSlideHandler attachs last/first imgs with origin last/first imgs to make slide seem infinite */
  const InfiniteSlideHandler = (flytoIndex: number) => {
    setTimeout(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = "";
      }
      setSlideIndex(flytoIndex);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "all 500ms ease-in-out";
        }
      }, 100);
    }, 500);
  };

  if (slideIndex === SLIDE_NUM - 1) {
    // if first img (slide array's last item) -> go to origin first img
    InfiniteSlideHandler(1);
  }

  if (slideIndex === 0) {
    // if last img (slide array's first item) -> go to origin last img
    InfiniteSlideHandler(BG_NUM);
  }

  const intervalHandler = () => {
    // when InfiniteSlideHandler works for first img (slide array's last item), control slideInterval to show transition animation normally
    if (slideIndex === SLIDE_NUM - 1) {
      setSlideInterval(500);
      console.log(slideInterval);
    } else {
      setSlideInterval(6000);
      console.log(slideInterval);
    }
  };

  /* SlideHandler for buttons */
  const slideHandler = (direction: number) => {
    setSlideIndex((prev) => prev + direction);
  };

  /* stopAutoSlide when controlling slide with buttons */
  const stopAutoSlide = () => {
    setSlideInterval(10000000);
    console.log(slideInterval);
  };

  return (
    <>
      <PC>
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
      </PC>
      <Mobile>
        <MoBackground>
          {bgArr.map((item, index) => (
            <MoImgBox key={index}>
              <img src={item.img} />
            </MoImgBox>
          ))}
        </MoBackground>
      </Mobile>
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
