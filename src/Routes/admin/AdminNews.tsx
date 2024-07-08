import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import ImagesUploader from "../../Components/ImagesUploader";
import axios from "axios";

type ImageState = {
  [key: string]: (File | string)[] | null;
};
function AdminNewsletter() {
  const { code } = useParams();
  const [date, setDate] = useState("");
  const [kortit, setKortit] = useState("");
  const [engtit, setEngtit] = useState("");
  const [images, setImages] = useState<ImageState>({});
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      if (code) {
        const imgId = code.slice(-6);
        try {
          const textResponse = await axios.get(`/api/texts/news/${code}`);
          const imageResponse = await axios.get(`/api/images/news/${imgId}`);

          setDate(textResponse.data.date);
          setKortit(textResponse.data.kortit);
          setEngtit(textResponse.data.engtit);
          setExistingImages(imageResponse.data);
        } catch (error) {
          console.error("Failed to fetch news data", error);
        }
      }
    };
    fetchNewsData();
  }, [code]);

  const handleFileSelect = (id: string, files: (File | string)[]) => {
    setImages((prev) => ({ ...prev, [id]: files }));
  };

  const uploadImage = async (id: number, selectedImage: File) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    const fileType = selectedImage.type.split("/")[1];
    const formattedDate = date.replace(/-/g, ""); // Converts '2023-03' to '202303'
    const formattedId = String(id + 1).padStart(2, "0");
    const FileName = `${formattedDate}_${formattedId}.${fileType}`;

    try {
      await axios.post(`/api/uploads/news/${FileName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allImages = Object.values(images).flat().filter(Boolean) as File[];
    try {
      await Promise.all(
        allImages.map((image, index) => uploadImage(index, image))
      );

      const payload = { date, kortit, engtit, code };
      const apiUrl = code
        ? `/api/text-uploads/news/${code}`
        : "/api/text-uploads/news";

      try {
        await axios.post(apiUrl, payload);
        console.log("Text uploaded successfully!");
        alert("소식지가 업로드 되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("Text upload failed", error);
        alert("소식지 업로드에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Failed to upload images", error);
      alert("소식지 업로드에 실패하였습니다.");
    }
  };

  return (
    <Admin pageSubtitle="소식지 업로드">
      <Form onSubmit={handleSubmit}>
        <div>
          <span>소식지 정보</span>
          <p>제시된 형식에 맞추어 작성해주세요.</p>
          <input
            type="month"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          ></input>
          <input
            placeholder="한글 소식지명"
            value={kortit}
            onChange={(e) => setKortit(e.target.value)}
            required
          ></input>
          <input
            placeholder="영문 소식지명"
            value={engtit}
            onChange={(e) => setEngtit(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <span>소식지 업로드</span>
          <p>
            !! 파일 선택 순으로 업로드 되므로, 업로드 순서에 주의해주세요 !!
          </p>
          <ImagesUploader
            id="news"
            onFileSelect={handleFileSelect}
          ></ImagesUploader>
        </div>
        <div>
          <button id="newsForm">업로드</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminNewsletter;
