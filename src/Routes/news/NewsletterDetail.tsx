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

function NewsletterDetail() {
  const { t, i18n } = useTranslation("newsletter");
  const { id } = useParams();
  console.log(id);
  const { images, error } = useImages({
    type: "news",
    id: id ? id : "",
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!images) {
    return <div>Loading...</div>;
  }

  const newsTitle = `newstitle${id}`;

  return (
    <>
      <BodyWrapper
        pageTitle={t(newsTitle)}
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

export default NewsletterDetail;
