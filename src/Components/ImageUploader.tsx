import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface ImageUploaderProps {
  id: string;
  originURL?: string; // 초기 이미지 경로
  multiple?: boolean;
  onFileSelect: (id: string, file: File | null) => void;
}

const ImgUploaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 400px;
  height: 225px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UploadButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ImageUploader({ id, originURL, onFileSelect }: ImageUploaderProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewImage(originURL || null);
  }, [originURL]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileSelect(id, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onFileSelect(id, null);
      setPreviewImage(null);
    }
  };

  const handleImageRemove = () => {
    onFileSelect(id, null);
    setPreviewImage(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // input 값 초기화
    }
  };

  return (
    <ImgUploaderBox>
      <ImgBox>
        {previewImage ? (
          <img src={previewImage} alt="Preview" />
        ) : (
          originURL && <img src={originURL} alt="Initial" />
        )}
      </ImgBox>
      <UploadButtons>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={inputRef}
        />
        <button type="button" onClick={handleImageRemove}>
          X
        </button>
      </UploadButtons>
    </ImgUploaderBox>
  );
}

export default ImageUploader;
