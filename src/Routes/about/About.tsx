import styled from "styled-components";
import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import aboutimg from "../../img/1.jpg";

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
  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <>
          <ImgBox>
            <img src={aboutimg} />
          </ImgBox>
          <BodyWrapper
            pageTitle={t("ipagetitle")}
            pageSubtitle={t("ipagesubtitle")}
            pageTxt={t("ipagetxt")}
          >
            <IFrameWrapper>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.4021384946805!2d126.81563051212673!3d37.56914727192128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9c8f62a18c45%3A0x1256e4f335f96a1!2z7KO87Zal7ZWc6rWQ7ZqM!5e0!3m2!1sen!2skr!4v1682568484254!5m2!1sen!2skr"
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
