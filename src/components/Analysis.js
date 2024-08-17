import React, { useEffect, useState } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import './Analysis.css';

// ฟังก์ชันช่วยในการแปลงวันที่เป็นรูปแบบที่ Firebase รองรับ
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มต้นที่ 0 และให้ 2 หลัก
  const day = String(date.getDate()).padStart(2, '0'); // วันที่ให้ 2 หลัก
  return `${year}-${month}-${day}`;
};

const Analysis = () => {
  const [data, setData] = useState({});
  const [averages, setAverages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(db, 'devices/DEVICE001/data');
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(fetchedData || {});
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      const today = new Date();
      const todayString = formatDate(today);

      // คำนวณค่าเฉลี่ยของวันที่ผ่านมา
      const newAverages = calculateDailyAverages(data);
      setAverages(newAverages);

      // บันทึกค่าเฉลี่ยลงใน Firebase
      const averagesRef = ref(db, `devices/DEVICE001/averages/${todayString}`);
      set(averagesRef, newAverages)
        .then(() => console.log('ค่าเฉลี่ยของวันนี้ได้ถูกบันทึก'))
        .catch((error) => console.error('ไม่สามารถบันทึกค่าเฉลี่ย:', error));
    }
  }, [data, loading]);

  const calculateDailyAverages = (data) => {
    const dailyData = {};

    // รวมข้อมูลจากทุกประเภท (voltage, current, power, etc.)
    for (const [key, values] of Object.entries(data)) {
      if (key !== 'timestamps' && key !== 'dates') {
        for (const [, value] of Object.entries(values)) {
          const today = new Date();
          const todayString = formatDate(today);

          if (!dailyData[todayString]) {
            dailyData[todayString] = { count: 0, sum: 0 };
          }
          dailyData[todayString].count += 1;
          dailyData[todayString].sum += value;
        }
      }
    }
    
    const dailyAverages = {};
    for (const [date, { count, sum }] of Object.entries(dailyData)) {
      dailyAverages[date] = (sum / count).toFixed(2);
    }
    
    return dailyAverages;
  };

  return (
    <div className="analysis">
      <h1>การวิเคราะห์ข้อมูลไฟฟ้า</h1>
      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <div>
          <h2>ค่าเฉลี่ยต่อวัน</h2>
          <table>
            <thead>
              <tr>
                <th>วันที่</th>
                <th>ค่าเฉลี่ย</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(averages).map(([date, average]) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{average}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* กำจัดส่วนที่เกี่ยวข้องกับกราฟ */}
        </div>
      )}
    </div>
  );
};

export default Analysis;
