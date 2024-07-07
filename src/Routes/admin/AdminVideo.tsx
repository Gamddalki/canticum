import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import useImages from "../../hooks/useImages";
import axios from "axios";

/* youtube iframes */
const IframeBox = styled.div`
  width: 100%;
  height: 14vw;
  display: flex;
  background-color: black;
  div {
    flex: 1;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const Iframe = ({ src }: { src: string }) => {
  return (
    <div>
      <iframe
        src={src}
        frameBorder={0}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

function AdminVideo() {
  const { images, error: imageError } = useImages({ type: "video" });

  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // 추가

  useEffect(() => {
    setVideos(images.map((item) => item.filepath));
  }, [images]);

  const handleChange = (index: number, value: string) => {
    const newVideos = [...videos];
    newVideos[index] = value;
    setVideos(newVideos);
    console.log(newVideos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Promise.all(
        videos.map((video, index) => {
          const filename = `vid${index + 1}`;
          const type = "video";
          const code = `v${String(index + 1).padStart(6, "0")}`;
          console.log(filename, type, code, video);
          return axios.post(`/api/uploads/${type}/${filename}`, {
            filename,
            filepath: video,
            type,
            code,
          });
        })
      );
      alert("대표 영상이 수정되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading videos:", error);
      alert("대표 영상 수정에 실패하였습니다.");
    } finally {
      setLoading(false); // 추가
    }
  };

  return (
    <Admin pageSubtitle="대표영상 링크 수정">
      <>
        <IframeBox>
          {images.map((item, index) => (
            <Iframe key={index} src={item.filepath} />
          ))}
        </IframeBox>
        <Form onSubmit={handleSubmit}>
          <div>
            <span>대표영상 링크</span>
            <p>영상은 입력하신 순서대로 뜹니다.</p>
            {images.map((item, index) => (
              <input
                key={index}
                value={videos[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                required
              />
            ))}
          </div>
          <div>
            <button id="concertForm" type="submit">
              업로드
            </button>
          </div>
        </Form>
      </>
    </Admin>
  );
}

export default AdminVideo;
