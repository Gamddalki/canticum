import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import newsimg1 from "../../img/news/202305_01.jpg";
import ConcertCard from "../../Components/ConcertCard";

const ConcertBoard = styled.div``;

function Newsletter() {
  const { t, i18n } = useTranslation("newsletter");
  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <ConcertBoard>
          <ConcertCard
            linkto="/newsletter/2305"
            imgsrc={newsimg1}
            contitle={t("newstitle")}
            conwhen={t("newswhen")}
          ></ConcertCard>
        </ConcertBoard>
      </BodyWrapper>
    </>
  );
}

export default Newsletter;
