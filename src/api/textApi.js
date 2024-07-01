import axios from "axios";

export const fetchTexts = async (type) => {
  try {
    console.log("텍스트 요청", `/api/texts/${type}`);
    const response = await axios.get(`/api/texts/${type}`);
    console.log("텍스트 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching texts:", error);
    throw error;
  }
};
