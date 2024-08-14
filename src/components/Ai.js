import React, { useState, useEffect } from 'react';
import './Ai.css';

function Ai() {
  const [trend, setTrend] = useState('กำลังโหลด...'); // เริ่มต้นด้วยข้อความ "กำลังโหลด..."

  // ฟังก์ชันการคาดการณ์ (จำลอง)
  const predictEnergy = async () => {
    // การคาดการณ์จำลอง
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() * 100); // คืนค่าผลลัพธ์คาดการณ์แบบสุ่ม
      }, 500);
    });
  };

  // ดึงข้อมูลและอัปเดตการคาดการณ์ทุกๆ 5 นาที
  useEffect(() => {
    const interval = setInterval(async () => {
      const predictedValue = await predictEnergy();
      console.log(`Predicted Value: ${predictedValue}`);
      setTrend(prevTrend => {
        const previousValue = parseFloat(prevTrend.split(' ')[1]);
        console.log(`Previous Value: ${previousValue}`);
        if (!isNaN(previousValue)) {
          return predictedValue > previousValue
            ? `แนวโน้มเพิ่มขึ้น (${predictedValue.toFixed(2)})`
            : `แนวโน้มลดลง (${predictedValue.toFixed(2)})`;
        }
        return `เริ่มต้น (${predictedValue.toFixed(2)})`;
      });
    }, 300000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="ai-container">
      <h2>การคาดการณ์พลังงานแบบเรียลไทม์</h2>
      <div className="trend-box">
        <h3>แนวโน้มการเปลี่ยนแปลงพลังงาน:</h3>
        <p>{trend}</p>
      </div>
    </div>
  );
}

export default Ai;
