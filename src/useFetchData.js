// src/useFetchData.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./components/firebase";

const useFetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "your-collection-name"));
      const dataArray = querySnapshot.docs.map(doc => doc.data());
      setData(dataArray);
    };

    fetchData();
  }, []);

  return data;
};

export default useFetchData;
