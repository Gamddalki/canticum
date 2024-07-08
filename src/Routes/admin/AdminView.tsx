import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Admin from "../../Components/Admin";
import useTexts from "../../hooks/useTexts";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Div = styled.div`
  width: 700px;
  padding: 30px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  button {
    padding-left: 20px;
    color: white;
  }
`;

function AdminView() {
  let { type } = useParams();
  let pagetitle;
  if (type === "concert") {
    pagetitle = "공연안내";
  } else if (type === "newsletter") {
    type = "news";
    pagetitle = "소식지";
  } else if (type === "notice") {
    type = "noti";
    pagetitle = "공지사항";
  }
  const { texts, error: textError } = useTexts({ type: `${type}` });

  const handleDelete = async (code: string) => {
    try {
      await axios.delete(`/api/delete/${code}`);
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("삭제 과정에서 에러가 발생했습니다.");
    }
  };

  const sortedTexts = texts
    ? [...texts].sort((a, b) => b.code.localeCompare(a.code))
    : [];

  return (
    <Admin pageSubtitle={`${pagetitle} 조회 및 수정`}>
      <Div>
        {textError ? (
          <p style={{ color: "red" }}>에러 발생: {textError}</p>
        ) : (
          <ul>
            {sortedTexts.length > 0 ? (
              sortedTexts.map((text, index) => (
                <li key={index}>
                  <Link to={`/admin/${type}/${text.code}`}>
                    <span>{text.kortit}</span>
                  </Link>
                  <button onClick={() => handleDelete(text.code)}>
                    <FontAwesomeIcon icon={faTrashCan} size="1x" />
                  </button>
                </li>
              ))
            ) : (
              <p>데이터가 없습니다.</p>
            )}
          </ul>
        )}
      </Div>
    </Admin>
  );
}

export default AdminView;
