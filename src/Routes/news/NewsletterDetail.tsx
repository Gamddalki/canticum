import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import newsimg1 from "../../img/news/202305_01.jpg";
import newsimg2 from "../../img/news/202305_02.jpg";
import newsimg3 from "../../img/news/202305_03.jpg";
import newsimg4 from "../../img/news/202305_04.jpg";
import newsimg5 from "../../img/news/202305_05.jpg";

const ImgWrapper = styled.div`
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
`;

function NewsletterDetail() {
  const { t, i18n } = useTranslation("newsletter");
  return (
    <>
      <BodyWrapper
        pageTitle={t("newstitle")}
        pageSubtitle={t("pagetxt")}
        pageTxt={t("pagetxt")}
      >
        <ImgWrapper>
          <img src={newsimg1}></img>
          <img src={newsimg2}></img>
          <img src={newsimg3}></img>
          <img src={newsimg4}></img>
          <img src={newsimg5}></img>
        </ImgWrapper>
      </BodyWrapper>
    </>
  );
}

export default NewsletterDetail;
