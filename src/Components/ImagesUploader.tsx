import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface ImagesUploaderProps {
  id: string;
  originURL?: string[]; // 초기 이미지 경로들을 배열로 받음
  onFileSelect: (id: string, files: (File | string)[]) => void; // 여러 개의 파일 또는 URL을 전달
}

const ImgUploaderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 400px;
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
  height: 150px;
  object-fit: contain;
`;

function ImagesUploader({ id, originURL, onFileSelect }: ImagesUploaderProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<(File | string)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (originURL && originURL.length > 0) {
      console.log(originURL);
      setPreviewImages(originURL);
      setSelectedFiles(originURL);
      onFileSelect(id, originURL);
    } else {
      setPreviewImages([]);
      setSelectedFiles([]);
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
      updatedFiles.forEach((file) => {
        if (file instanceof File) {
          dataTransfer.items.add(file);
        }
      });
      inputRef.current.files = dataTransfer.files;
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedPreviewImages = Array.from(previewImages);
    const [removed] = updatedPreviewImages.splice(result.source.index, 1);
    updatedPreviewImages.splice(result.destination.index, 0, removed);

    const updatedFiles = Array.from(selectedFiles);
    const [removedFile] = updatedFiles.splice(result.source.index, 1);
    updatedFiles.splice(result.destination.index, 0, removedFile);

    setPreviewImages(updatedPreviewImages);
    setSelectedFiles(updatedFiles);
    onFileSelect(id, updatedFiles);
  };

  return (
    <ImgUploaderBox>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="vertical">
          {(provided) => (
            <ImgBox {...provided.droppableProps} ref={provided.innerRef}>
              {previewImages.map((image, index) => (
                <Draggable
                  key={index}
                  draggableId={`item-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        position: "relative",
                      }}
                    >
                      <ImagePreview src={image} alt={`Preview ${index}`} />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                      >
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ImgBox>
          )}
        </Droppable>
      </DragDropContext>
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
