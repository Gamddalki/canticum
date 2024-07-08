import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import ImagesUploader from "../../Components/ImagesUploader";
import axios from "axios";

type ImageState = {
  [key: string]: (File | string)[] | null;
};

type ExistingImage = {
  id: number;
  filename: string;
  filepath: string;
  type: string;
  code: string;
};

function AdminConcert() {
  const { code } = useParams();
  const [date, setDate] = useState("");
  const [kortit, setKortit] = useState("");
  const [engtit, setEngtit] = useState("");
  const [images, setImages] = useState<ImageState>({});
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchConcertData = async () => {
      if (code) {
        const imgId = code.slice(-6);
        try {
          const textResponse = await axios.get(`/api/texts/concert/${code}`);
          const imageResponse = await axios.get(`/api/images/concert/${imgId}`);

          setDate(textResponse.data.date);
          setKortit(textResponse.data.kortit);
          setEngtit(textResponse.data.engtit);
          const filepaths = imageResponse.data.map(
            (image: ExistingImage) => image.filepath
          );
          setExistingImages(filepaths);
        } catch (error) {
          console.error("Failed to fetch concert data", error);
        }
      }
    };
    fetchConcertData();

    // 컴포넌트가 언마운트될 때 상태를 초기화하는 클린업 함수
    return () => {
      setDate("");
      setKortit("");
      setEngtit("");
      setImages({});
      setExistingImages([]);
    };
  }, [code]);

  const handleFileSelect = (id: string, files: (File | string)[]) => {
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
    try {
      await Promise.all(
        allImages.map((image, index) => uploadImage(index, image))
      );

      const payload = { date, kortit, engtit, code };
      const apiUrl = code
        ? `/api/text-uploads/concert/${code}`
        : "/api/text-uploads/concert";

      try {
        await axios.post(apiUrl, payload);
        console.log("Text uploaded successfully!");
        alert("공연 안내가 업로드 되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("Text upload failed", error);
        alert("공연 안내 업로드에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Failed to upload images", error);
      alert("공연 안내 업로드에 실패하였습니다.");
    }
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
            originURL={existingImages}
            onFileSelect={handleFileSelect}
          ></ImagesUploader>
        </div>
        {code ? (
          <></>
        ) : (
          <div>
            <button id="concertForm" type="submit">
              업로드
            </button>
          </div>
        )}
      </Form>
    </Admin>
  );
}

export default AdminConcert;
