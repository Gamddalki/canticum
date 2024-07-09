import { useState } from "react";
import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useTexts from "../../hooks/useTexts";
import { Link } from "react-router-dom";

const Div = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 40px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.footerColor};
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #c1c1c1;
    font-size: 18px;
    background-color: ${(props) => props.theme.footerColor};
    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const DateSpan = styled.span`
  font-size: 14px;
  @media screen and (max-width: 768px) {
    font-size: 8px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  button {
    margin: 0 5px;
    padding: 4px 8px;
    border: none;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
    &.active {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const ITEMS_PER_PAGE = 10;

function Notice() {
  const { t, i18n } = useTranslation("notice");
  const { texts, error: textError } = useTexts({ type: "noti" });
  const [currentPage, setCurrentPage] = useState(1);

  const sortedTexts = texts
    ? [...texts].sort((a, b) => Number(b.id) - Number(a.id))
    : [];

  const totalPages = Math.ceil(sortedTexts.length / ITEMS_PER_PAGE);

  const currentItems = sortedTexts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <Div>
          {textError ? (
            <p style={{ color: "red" }}>에러 발생: {textError}</p>
          ) : (
            <>
              <ul>
                {currentItems.length > 0 ? (
                  currentItems.map((text, index) => (
                    <li key={index}>
                      <Link to={`/notice/${text.code}`}>
                        <span>{text.kortit}</span>
                      </Link>
                      <DateSpan>{text.date}</DateSpan>
                    </li>
                  ))
                ) : (
                  <p>데이터가 없습니다.</p>
                )}
              </ul>
              <Pagination>
                <button
                  onClick={() => handleClick(1)}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handleClick(page)}
                      className={page === currentPage ? "active" : ""}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handleClick(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </Pagination>
            </>
          )}
        </Div>
      </BodyWrapper>
    </>
  );
}

export default Notice;
