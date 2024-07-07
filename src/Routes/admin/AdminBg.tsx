import React, { useState } from "react";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import { BgImages } from "../Home";
import ImageUploader from "../../Components/ImageUploader";
import axios from "axios";

function AdminBg() {
  const bgArr = BgImages();

  const [images, setImages] = useState<{ [key: string]: File | null }>({});

  const handleFileSelect = (id: string, file: File | null) => {
    setImages((prev) => ({ ...prev, [id]: file }));
  };

  const uploadImage = async (id: string, selectedImage: File) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    const fileType = selectedImage.type.split("/")[1];
    const FileName = `${Number(id) + 1}_${Date.now()}.${fileType}`;
    try {
      await axios.post(`/api/uploads/background/${FileName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return FileName;
    } catch (error) {
      console.error(`Image upload failed for ${id}`, error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadPromises = Object.entries(images)
      .map(([id, selectedImage]) => {
        if (selectedImage) {
          return uploadImage(id, selectedImage);
        }
        return null;
      })
      .filter((promise) => promise !== null);

    try {
      await Promise.all(uploadPromises);
      alert("배경 이미지가 업로드 되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Failed to upload one or more images", error);
      alert("배경 이미지 업로드에 실패하였습니다.");
    }
  };

  return (
    <Admin pageSubtitle="대문사진 변경">
      <Form onSubmit={handleSubmit}>
        <div>
          <span>대문사진 변경</span>
          <p>변경하실 대문 사진을 업로드하고 변경 버튼을 눌러주세요.</p>
          <p>16:9 비율이 아닌 경우 사진의 위아래가 잘려보일 수 있습니다.</p>
          {bgArr.map((item, index) => (
            <ImageUploader
              id={index.toString()}
              originURL={item.path}
              onFileSelect={handleFileSelect}
            ></ImageUploader>
          ))}
        </div>
        <div>
          <button id="bgForm" type="submit">
            저장
          </button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminBg;
