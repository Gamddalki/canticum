import { useState, useEffect } from "react";
import { fetchImages } from "../api/imageApi"; // API 호출 함수 import

interface ImageData {
  filename: string;
  filepath: string;
  code: string;
}

const useImages = ({ type, id }: { type: string; id?: string }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 이미지를 가져와서 상태에 설정
    const getImages = async () => {
      try {
        const imagesData = await fetchImages(type, id);
        console.log(imagesData);
        setImages(imagesData);
      } catch (error) {
        console.log("Error fetching images:", error);
        setError(
          error instanceof Error ? error : new Error("An error occurred")
        );
      }
    };

    getImages();
  }, [type, id]);

  return { images, error };
};

export default useImages;
