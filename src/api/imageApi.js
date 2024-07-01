import axios from "axios";

// 이미지 유형에 따라 이미지를 가져오는 함수
export const fetchImages = async (type, id) => {
  try {
    const url = id ? `/api/images/${type}/${id}` : `/api/images/${type}`;
    console.log("요청 URL:", url);
    const response = await axios.get(url); // axios를 사용하여 GET 요청 보내기
    console.log("성공", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
  }
};
