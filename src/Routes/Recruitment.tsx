import BodyWrapper from "../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import bg1 from "../img/1.jpg";
import appform from "../file/칸티쿰합창단원응시원서.docx";

const ApplicationFormDown = styled.a`
  text-decoration: underline;
  font-size: 15pt;
`;

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

function Recruitment() {
  const { t, i18n } = useTranslation("recruitment");
  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <ApplicationFormDown
          href={appform}
          download="칸티쿰합창단원응시원서.docx"
        >
          {t("atxt")}
          <ImgBox>
            <img src={bg1} />
          </ImgBox>
        </ApplicationFormDown>
      </BodyWrapper>
    </>
  );
}

export default Recruitment;
