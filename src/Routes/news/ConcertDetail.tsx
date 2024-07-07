import BodyWrapper from "../../Components/BodyWrapper";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useImages from "../../hooks/useImages";
import useTexts from "../../hooks/useTexts";
import { useRecoilValue } from "recoil";
import { isEngAtom } from "../../atoms";

const ImgWrapper = styled.div`
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
`;

function ConcertDetail() {
  const { t, i18n } = useTranslation("concert");
  const { texts, error: textError } = useTexts({ type: "concert" });
  const isEng = useRecoilValue(isEngAtom);

  const { id } = useParams();
  console.log(id);
  const { images, error: imageError } = useImages({
    type: "concert",
    id: id ? id : "",
  });

  if (imageError || textError) {
    const errorMessage = imageError?.message || textError;
    return <div>Error: {errorMessage}</div>;
  }

  if (!images || !texts) {
    return <div>Loading...</div>;
  }

  const sortedImages = images.sort((a, b) => {
    if (a.filename < b.filename) return -1;
    if (a.filename > b.filename) return 1;
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

  const hasImages = images.length > 0;

  return (
    <>
      <BodyWrapper
        pageTitle={hasImages ? getTitle(images[0].code) : ""}
        pageSubtitle={hasImages ? getDate(images[0].code) : ""}
        pageTxt=""
      >
        <ImgWrapper>
          {sortedImages.map((image, index) => (
            <img key={index} src={image.filepath}></img>
          ))}
        </ImgWrapper>
      </BodyWrapper>
    </>
  );
}

export default ConcertDetail;
