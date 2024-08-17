import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa'; // นำเข้าไอคอนโหลด
import './Ai.css'; // เชื่อมโยงกับไฟล์ CSS

const Ai = () => {
  const [trend, setTrend] = useState('');
  const [loading, setLoading] = useState(false); // เพิ่มสถานะ loading

  const fetchData = async () => {
    setLoading(true); // เริ่มต้นการโหลด
    try {
      const response = await axios.get('http://127.0.0.1:5000/predict');
      setTrend(response.data.trend);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setLoading(false); // สิ้นสุดการโหลด
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>ค่าไฟฟ้าโดยรวม</h1>
      <div className="info-box">
        <p>แนวโน้มคือ: {loading ? (
          <FaSpinner className="spinner" /> // ใช้ไอคอนโหลดจาก React Icons
        ) : (
          trend === 'down' ? 'ลดลง' : 'เพิ่มขึ้น'
        )}</p>
      </div>
      <button className="button" onClick={fetchData} disabled={loading}>
        {loading ? (
          <FaSpinner className="spinner" /> // ใช้ไอคอนโหลดจาก React Icons
        ) : (
          'ทำนายใหม่'
        )}
      </button>
    </div>
  );
};

export default Ai;
