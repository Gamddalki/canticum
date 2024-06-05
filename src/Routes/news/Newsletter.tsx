import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ConcertCard from "../../Components/ConcertCard";
import useImages from "../../hooks/useImages";

const ConcertBoard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

function Newsletter() {
  const { t, i18n } = useTranslation("newsletter");
  const { images, error } = useImages({ type: "news" });

  const coverImages = images.filter((image) => image.filename.includes("_01"));

  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <ConcertBoard>
          {error ? (
            <div>{t("error_loading_images")}</div> // 이미지 로드 오류 메시지
          ) : (
            coverImages.map((image, index) => (
              <ConcertCard
                key={index}
                linkto={`/newsletter/${image.filename.split("_")[0]}`} // 링크 생성
                imgsrc={image.filepath}
                contitle={t(`newstitle${image.filename.split("_")[0]}`)}
                conwhen={t(`newswhen${image.filename.split("_")[0]}`)}
              ></ConcertCard>
            ))
          )}
        </ConcertBoard>
      </BodyWrapper>
    </>
  );
}

export default Newsletter;
