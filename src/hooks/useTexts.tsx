// src/hooks/useTexts.tsx
import { useState, useEffect } from "react";
import { fetchTexts } from "../api/textApi";

interface Newsletters {
  date: string;
  kortit: string;
  engtit: string;
  code: string;
  id: string;
}

interface UseTextsProps {
  type: string;
}

const useTexts = ({ type }: UseTextsProps) => {
  const [texts, setTexts] = useState<Newsletters[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTexts = async () => {
      try {
        const data = await fetchTexts(type);
        console.log(data);
        setTexts(data);
      } catch (err) {
        console.error(err);
        setError("Error loading texts");
      }
    };

    getTexts();
  }, [type]);

  return { texts, error };
};

export default useTexts;
