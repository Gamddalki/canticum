import styled from "styled-components";
import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import { BgImages } from "../Home";

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 30px;
  @media screen and (max-width: 768px) {
    padding-top: 15px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
  }
`;

const IFrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  padding: auto;
`;

function About() {
  const { t, i18n } = useTranslation("about");
  const bgArr = BgImages();

  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <>
          {bgArr[0] ? (
            <ImgBox>
              <img src={bgArr[0].path} />
            </ImgBox>
          ) : (
            <></>
          )}
          <BodyWrapper
            pageTitle={t("ipagetitle")}
            pageSubtitle={t("ipagesubtitle")}
            pageTxt={t("ipagetxt")}
          >
            <IFrameWrapper>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12651.393634431266!2d126.93683342581339!3d37.558635164729736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c989b39e3c087%3A0x71f8f20d4ca79ad2!2z7Iug7ZiE6rWQ7ZqM!5e0!3m2!1sko!2skr!4v1715577927615!5m2!1sko!2skr"
                width="100%"
                height="450"
                frameBorder={0}
              >
                로딩중...
              </iframe>
            </IFrameWrapper>
          </BodyWrapper>
        </>
      </BodyWrapper>
    </>
  );
}

export default About;
