import BodyWrapper from "../../Components/BodyWrapper";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useImages from "../../hooks/useImages";

const ImgWrapper = styled.div`
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
`;

function ConcertDetail() {
  const { t, i18n } = useTranslation("concert");
  const { id } = useParams();
  console.log(id);
  const { images, error } = useImages({
    type: "concert",
    id: id ? id : "",
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!images) {
    return <div>Loading...</div>;
  }

  const pageTitle = `contitle${id}`;

  return (
    <>
      <BodyWrapper
        pageTitle={t(pageTitle)}
        pageSubtitle={t("pagetxt")}
        pageTxt={t("pagetxt")}
      >
        <ImgWrapper>
          {images.map((image, index) => (
            <img key={index} src={image.filepath}></img>
          ))}
        </ImgWrapper>
      </BodyWrapper>
    </>
  );
}

export default ConcertDetail;
