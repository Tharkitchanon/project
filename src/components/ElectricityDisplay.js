import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './ElectricityDisplay.css';

const ElectricityDisplay = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [cost, setCost] = useState(null);
  const ratePerKwh = 3; // อัตราค่าไฟฟ้าต่อหน่วย (บาท/kWh)

  useEffect(() => {
    const dataRef = ref(db, 'devices/DEVICE001/data/energy');
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const values = Object.values(fetchedData);
        const labels = Object.keys(fetchedData);
        setData(values);
        setLabels(labels);
        // คำนวณค่าใช้จ่ายล่าสุด
        const latestValue = values[values.length - 1];
        setCost(latestValue * ratePerKwh);
      }
    });
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'พลังงาน (kWh)',
        data: data,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
    ],
  };

  return (
    <div className="electricity-display">
      <h1>ข้อมูลค่าไฟฟ้า</h1>
      <div className="value-display">
        {cost !== null ? (
          <>
            <p>ค่าไฟฟ้าล่าสุด: {cost.toFixed(2)} บาท</p>
          </>
        ) : (
          <p>กำลังโหลดข้อมูล...</p>
        )}
      </div>
      <div className="chart-container">
        <h2>การใช้พลังงานตามเวลา</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ElectricityDisplay;
