import BodyWrapper from "../../Components/BodyWrapper";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useImages from "../../hooks/useImages";
import useTexts from "../../hooks/useTexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFileImage,
  faFilePdf,
  faFileWord,
} from "@fortawesome/free-regular-svg-icons";

const ImageList = styled.ul`
  list-style-type: none;
  padding: 0;
  li {
    margin: 10px 0;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "doc":
    case "docx":
      return <FontAwesomeIcon icon={faFileWord} size="1x" />;
    case "pdf":
      return <FontAwesomeIcon icon={faFilePdf} size="1x" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <FontAwesomeIcon icon={faFileImage} size="1x" />;
    case "hwp":
    default:
      return <FontAwesomeIcon icon={faFileAlt} size="1x" />;
  }
};

function NoticeDetail() {
  const { t, i18n } = useTranslation("notice");
  const { texts, error: textError } = useTexts({ type: "noti" });

  const { id } = useParams();
  console.log(id);

  const { images, error: imageError } = useImages({
    type: "noti",
    id: id ? id : "",
  });

  if (imageError || textError) {
    const errorMessage = imageError?.message || textError;
    return <div>Error: {errorMessage}</div>;
  }

  const getTitle = (code: string) => {
    const text = texts.find((t) => t.code === code);
    return text ? text.kortit : "";
  };

  const getDate = (code: string) => {
    const text = texts.find((t) => t.code === code);
    return text ? text.date : "";
  };

  const getText = (code: string) => {
    const text = texts.find((t) => t.code === code);
    return text ? text.engtit : "";
  };

  return (
    <>
      <BodyWrapper
        pageTitle={id ? getTitle(id) : ""}
        pageSubtitle={id ? getDate(id) : ""}
        pageTxt={id ? getText(id) : ""}
      >
        {images ? (
          <ImageList>
            {images.map((image, index) => (
              <li key={index}>
                <a href={image.filepath} download>
                  {getFileIcon(image.filename)} {image.filename}
                </a>
              </li>
            ))}
          </ImageList>
        ) : (
          <></>
        )}
      </BodyWrapper>
    </>
  );
}

export default NoticeDetail;
