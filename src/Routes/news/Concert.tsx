import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ConcertCard from "../../Components/ConcertCard";
import useImages from "../../hooks/useImages";
import useTexts from "../../hooks/useTexts";
import { useRecoilValue } from "recoil";
import { isEngAtom } from "../../atoms";

const ConcertBoard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

function Concert() {
  const { t, i18n } = useTranslation("concert");
  const isEng = useRecoilValue(isEngAtom);
  const { images, error: imageError } = useImages({ type: "concert" });
  const { texts, error: textError } = useTexts({ type: "concert" });

  const coverImages = images
    .filter((image) => image.filename.includes("_1"))
    .sort((a, b) => {
      // 내림차순 정렬
      if (a.filename < b.filename) return 1;
      if (a.filename > b.filename) return -1;
      return 0;
    });

  const getTitle = (code: string) => {
    const text = texts.find((t) => t.code === code);
    return text ? (isEng ? text.engtit : text.kortit) : "";
  };

  const getDate = (code: string) => {
    const text = texts.find((t) => t.code === code);
    return text ? text.date : "";
  };

  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <ConcertBoard>
          {imageError || textError ? (
            <div>{t("error_loading_images")}</div> // 이미지 또는 텍스트 로드 오류 메시지
          ) : (
            coverImages.map((image, index) => (
              <ConcertCard
                key={index}
                linkto={`/newsletter/concert/${image.filename.split("_")[0]}`} // 링크 생성
                imgsrc={image.filepath}
                contitle={getTitle(image.code)}
                conwhen={getDate(image.code)}
              ></ConcertCard>
            ))
          )}
        </ConcertBoard>
      </BodyWrapper>
    </>
  );
}

export default Concert;
