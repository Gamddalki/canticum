import React, { useState } from "react";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import ImagesUploader from "../../Components/ImagesUploader";
import axios from "axios";

function AdminConcert() {
  const [date, setDate] = useState("");
  const [kortit, setKortit] = useState("");
  const [engtit, setEngtit] = useState("");
  const [images, setImages] = useState<{ [key: string]: File[] | null }>({});

  const handleFileSelect = (id: string, files: File[] | null) => {
    setImages((prev) => ({ ...prev, [id]: files }));
  };

  const uploadImage = async (id: number, selectedImage: File) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    const fileType = selectedImage.type.split("/")[1];
    const formattedDate = date.replace(/-/g, "").slice(2); // Converts '2023-03-30' to '230330'
    const FileName = `${formattedDate}_${id + 1}.${fileType}`;

    try {
      await axios.post(`/api/uploads/concert/${FileName}`, formData, {
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
    for (let i = 0; i < allImages.length; i++) {
      const image = allImages[i];
      try {
        await uploadImage(i, image);
      } catch (error) {
        console.error(`Failed to upload image ${i}`, error);
      }
    }

    try {
      await axios.post("/api/text-uploads/concert", {
        date,
        kortit,
        engtit,
      });
      console.log("Text uploaded successfully!");
    } catch (error) {
      console.error("Text upload failed", error);
    }

    window.location.reload(); // Reload after all uploads are complete
  };

  return (
    <Admin pageSubtitle="공연안내 업로드">
      <Form onSubmit={handleSubmit}>
        <div>
          <span>공연 정보</span>
          <p>제시된 형식에 맞추어 작성해주세요.</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          ></input>
          <input
            placeholder="한글 공연명 (형식: 칸티쿰합창단 제34회 정기 연주회)"
            value={kortit}
            onChange={(e) => setKortit(e.target.value)}
            required
          ></input>
          <input
            placeholder="영문 공연명 (형식: Canticum Choir 34th Concert)"
            value={engtit}
            onChange={(e) => setEngtit(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <span>공연 포스터</span>
          <p>
            !! 파일 선택 순으로 업로드 되므로, 업로드 순서에 주의해주세요 !!
          </p>
          <ImagesUploader
            id="con"
            onFileSelect={handleFileSelect}
          ></ImagesUploader>
        </div>
        <div>
          <button id="concertForm" type="submit">
            업로드
          </button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminConcert;
