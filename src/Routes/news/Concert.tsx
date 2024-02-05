import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import conimg1 from "../../img/concert/230530_1.jpg";
import conimg2 from "../../img/concert/231214_1.jpg";
import ConcertCard from "../../Components/ConcertCard";

const ConcertBoard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

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
            linkto="/newsletter/concert/231214"
            imgsrc={conimg2}
            contitle={t("contitle2")}
            conwhen={t("conwhen2")}
          ></ConcertCard>
          <ConcertCard
            linkto="/newsletter/concert/230530"
            imgsrc={conimg1}
            contitle={t("contitle1")}
            conwhen={t("conwhen1")}
          ></ConcertCard>
        </ConcertBoard>
      </BodyWrapper>
    </>
  );
}

export default Concert;
