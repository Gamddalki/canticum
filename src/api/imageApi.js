import axios from "axios";

// 이미지 유형에 따라 이미지를 가져오는 함수
export const fetchImages = async (type, id) => {
  try {
    const url = id ? `/api/images/${type}/${id}` : `/api/images/${type}`;
    console.log("요청 URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // 응답 데이터를 JSON으로 파싱
    console.log("성공", data);
    return data;
  } catch (error) {
    console.log("실패");
    console.error("Error fetching images:", error);
    throw error;
  }
};
