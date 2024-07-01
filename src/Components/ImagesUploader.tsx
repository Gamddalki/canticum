import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface ImagesUploaderProps {
  id: string;
  originURL?: string[]; // 초기 이미지 경로들을 배열로 받음
  onFileSelect: (id: string, files: File[]) => void; // 여러 개의 파일을 전달
}

const ImgUploaderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const UploadButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

function ImagesUploader({ id, originURL, onFileSelect }: ImagesUploaderProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (originURL && originURL.length > 0) {
      setPreviewImages(originURL);
    } else {
      setPreviewImages([]);
    }
  }, [originURL]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const images = files.filter((file) => file.type.startsWith("image/"));
    const imageUrls = images.map((file) => URL.createObjectURL(file));

    const updatedFiles = [...selectedFiles, ...images];

    onFileSelect(id, updatedFiles);
    setSelectedFiles(updatedFiles);
    setPreviewImages((prev) => [...prev, ...imageUrls]);
  };

  const handleImageRemove = (index: number) => {
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);

    setPreviewImages(updatedPreviewImages);
    setSelectedFiles(updatedFiles);
    onFileSelect(id, updatedFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
  };

  return (
    <ImgUploaderBox>
      <ImgBox>
        {previewImages.map((imageUrl, index) => (
          <div key={index} style={{ position: "relative" }}>
            <ImagePreview src={imageUrl} alt={`Preview ${index}`} />
            <button type="button" onClick={() => handleImageRemove(index)}>
              X
            </button>
          </div>
        ))}
      </ImgBox>
      <UploadButtons>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          ref={inputRef}
        />
      </UploadButtons>
    </ImgUploaderBox>
  );
}

export default ImagesUploader;
