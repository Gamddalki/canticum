import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import conimg1 from "../../img/230530_1.jpg";
import conimg2 from "../../img/230530_2.jpg";

const ImgWrapper = styled.div`
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
`;

function ConcertDetail() {
  const { t, i18n } = useTranslation("concert");
  return (
    <>
      <BodyWrapper
        pageTitle={t("contitle")}
        pageSubtitle={t("pagetxt")}
        pageTxt={t("pagetxt")}
      >
        <ImgWrapper>
          <img src={conimg1}></img>
          <img src={conimg2}></img>
        </ImgWrapper>
      </BodyWrapper>
    </>
  );
}

export default ConcertDetail;
