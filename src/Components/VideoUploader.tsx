import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface VideoUploaderProps {
  id: string;
  originURL?: string; // 초기 비디오 경로
  multiple?: boolean;
  onFileSelect: (id: string, file: File | null) => void;
}

const VideoUploaderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoBox = styled.div`
  width: 400px;
  height: 225px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  video {
    height: 100%;
    object-fit: cover;
  }
`;

const UploadButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

function VideoUploader({ id, originURL, onFileSelect }: VideoUploaderProps) {
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewVideo(originURL || null);
  }, [originURL]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      onFileSelect(id, file);
      const url = URL.createObjectURL(file);
      setPreviewVideo(url);
    } else {
      onFileSelect(id, null);
      setPreviewVideo(null);
    }
  };

  const handleVideoRemove = () => {
    onFileSelect(id, null);
    setPreviewVideo(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // input 값 초기화
    }
  };

  return (
    <VideoUploaderBox>
      <VideoBox>
        {previewVideo ? (
          <video controls src={previewVideo} />
        ) : (
          originURL && <video controls src={originURL} />
        )}
      </VideoBox>
      <UploadButtons>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          ref={inputRef}
        />
        <button type="button" onClick={handleVideoRemove}>
          X
        </button>
      </UploadButtons>
    </VideoUploaderBox>
  );
}

export default VideoUploader;
