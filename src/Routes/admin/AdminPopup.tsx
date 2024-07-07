import React, { useState } from "react";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import axios from "axios";
import VideoUploader from "../../Components/VideoUploader";
import useImages from "../../hooks/useImages";

function AdminPopup() {
  const [video, setVideo] = useState<File | null>(null);
  const { images, error: imageError } = useImages({ type: "popup" });
  console.log(images);

  const handleFileSelect = (id: string, file: File | null) => {
    setVideo(file);
  };

  const uploadVideo = async (selectedVideo: File) => {
    const formData = new FormData();
    formData.append("video", selectedVideo);
    const fileType = selectedVideo.type.split("/")[1];
    const fileName = `${Date.now()}.${fileType}`;
    try {
      await axios.post(`/api/uploads/popup/${fileName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("팝업 영상이 업로드 되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Video upload failed", error);
      alert("팝업 영상 업로드에 실패하였습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (video) {
      try {
        await uploadVideo(video);
      } catch (error) {
        console.error("Failed to upload video", error);
      }
    } else {
      alert("업로드할 영상을 선택해 주세요.");
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.delete("/api/delete/p000001");
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("삭제 과정에서 에러가 발생했습니다.");
    }
  };

  return (
    <Admin pageSubtitle="팝업 영상 변경 및 삭제">
      <Form onSubmit={handleSubmit}>
        <div>
          <span>팝업 영상 변경</span>
          <p>변경하실 팝업 영상을 업로드하고 저장 버튼을 눌러주세요.</p>
          <div>
            <button onClick={handleDelete}>팝업 삭제</button>
          </div>
          {images && images.length > 0 ? (
            <VideoUploader
              id="popup"
              originURL={images[0].filepath}
              onFileSelect={handleFileSelect}
            />
          ) : (
            <VideoUploader
              id="popup"
              originURL=""
              onFileSelect={handleFileSelect}
            />
          )}
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

export default AdminPopup;
