import React, { useState } from "react";
import styled from "styled-components";

interface ImageUploaderProps {
  id: string;
  multiple?: boolean; // 추가된 부분
  onFileChange: (id: string, imageUrl: string | string[]) => void;
}

const UploadButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ImageUploader({ id, multiple, onFileChange }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const id = e.target.id;
    if (files) {
      const fileArray: string[] = [];
      const reader = new FileReader();
      reader.onloadend = (finishedE: ProgressEvent<FileReader>) => {
        if (multiple) {
          fileArray.push(reader.result as string);
          onFileChange(id, fileArray);
          setPreviewUrl(fileArray);
        } else {
          onFileChange(id, reader.result as string);
          setPreviewUrl(reader.result as string);
        }
      };
      for (let i = 0; i < files.length; i++) {
        reader.readAsDataURL(files[i]);
      }
    }
  };
  const handleClearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    onFileChange(id, "");
    setPreviewUrl([]);
  };
  return (
    <>
      <UploadButtons>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple={multiple}
        ></input>
        <button id={id} type="button" onClick={handleClearFile}>
          X
        </button>
      </UploadButtons>
      {Array.isArray(previewUrl) ? (
        previewUrl.map((url, index) => (
          <div key={index}>
            <img src={url} />
          </div>
        ))
      ) : (
        <img src={previewUrl} alt="Preview" />
      )}
    </>
  );
}

export default ImageUploader;
