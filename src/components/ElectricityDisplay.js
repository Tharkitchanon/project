import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import '../App.css'; // ตรวจสอบให้แน่ใจว่าได้เพิ่ม CSS ที่ได้กล่าวถึง

const ElectricityDisplay = () => {
  const [value, setValue] = useState(null);
  const ratePerKwh = 3; // อัตราค่าไฟฟ้าต่อหน่วย (บาท/kWh)

  useEffect(() => {
    const dataRef = ref(db, 'devices/DEVICE001/data/energy'); // เปลี่ยน DEVICE001 เป็นรหัสอุปกรณ์ที่ใช้งาน
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // หาค่าล่าสุดในข้อมูล
        const values = Object.values(data);
        const latestValue = values[values.length - 1];
        setValue(latestValue * ratePerKwh); // แปลงเป็นหน่วยบาท
      }
    });
  }, []);

  return (
    <div className="electricity-display">
      <h1>ค่าไฟฟ้าล่าสุด</h1>
      <div className="value-display">
        {value !== null ? (
          <p>ค่าไฟ : {value.toFixed(2)} บาท</p>
        ) : (
          <p>กำลังโหลด...</p>
        )}
      </div>
    </div>
  );
};

export default ElectricityDisplay;
