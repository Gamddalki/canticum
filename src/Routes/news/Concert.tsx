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

function Concert() {
  const { t, i18n } = useTranslation("concert");
  const { images, error } = useImages({ type: "concert" });

  const coverImages = images.filter((image) => image.filename.includes("_1"));

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
                linkto={`/newsletter/concert/${image.filename.split("_")[0]}`} // 링크 생성
                imgsrc={image.filepath}
                contitle={t(`contitle${image.filename.split("_")[0]}`)}
                conwhen={t(`conwhen${image.filename.split("_")[0]}`)}
              ></ConcertCard>
            ))
          )}
        </ConcertBoard>
      </BodyWrapper>
    </>
  );
}

export default Concert;
