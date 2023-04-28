import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import conimg1 from "../../img/230530_1.jpg";
import ConcertCard from "../../Components/ConcertCard";

const ConcertBoard = styled.div``;

function Concert() {
  const { t, i18n } = useTranslation("concert");
  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <ConcertBoard>
          <ConcertCard
            linkto="/newsletter/concert/230530"
            imgsrc={conimg1}
            contitle={t("contitle")}
            conwhen={t("conwhen")}
          ></ConcertCard>
        </ConcertBoard>
      </BodyWrapper>
    </>
  );
}

export default Concert;
