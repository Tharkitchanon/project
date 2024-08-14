import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css'; // ตรวจสอบเส้นทางให้ถูกต้อง

const Analysis = () => {
  const [data, setData] = useState({});
  const [summary, setSummary] = useState({
    dailyAverage: 0,
    monthlyAverage: 0,
    totalUsage: 0
  });

  useEffect(() => {
    const dataRef = ref(db, 'electricalData');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Data from Firebase:', data); // เพิ่มการตรวจสอบข้อมูลที่ดึงมาจาก Firebase
      if (data) {
        setData(data);
        calculateSummary(data);
      } else {
        // กรณีที่ data เป็น null หรือ undefined
        setSummary({
          dailyAverage: 0,
          monthlyAverage: 0,
          totalUsage: 0
        });
      }
    });
  }, []);

  const calculateSummary = (data) => {
    const timestamps = data.timestamps ? Object.values(data.timestamps) : [];
    const energy = data.energy ? Object.values(data.energy) : [];

    if (timestamps.length === 0 || energy.length === 0) {
      console.log('No data to calculate'); // เพิ่มการตรวจสอบข้อมูลก่อนคำนวณ
      return;
    }

    const dailyUsage = {};
    timestamps.forEach((timestamp, index) => {
      const date = new Date(timestamp).toLocaleDateString();
      if (!dailyUsage[date]) {
        dailyUsage[date] = 0;
      }
      dailyUsage[date] += energy[index];
    });

    const dailyUsageValues = Object.values(dailyUsage);
    const dailyAverage = dailyUsageValues.length > 0 
      ? dailyUsageValues.reduce((acc, val) => acc + val, 0) / dailyUsageValues.length 
      : 0;

    const monthlyUsage = {};
    timestamps.forEach((timestamp, index) => {
      const month = new Date(timestamp).toLocaleDateString('default', { month: 'short', year: 'numeric' });
      if (!monthlyUsage[month]) {
        monthlyUsage[month] = 0;
      }
      monthlyUsage[month] += energy[index];
    });

    const monthlyUsageValues = Object.values(monthlyUsage);
    const monthlyAverage = monthlyUsageValues.length > 0 
      ? monthlyUsageValues.reduce((acc, val) => acc + val, 0) / monthlyUsageValues.length 
      : 0;

    const totalUsage = energy.length > 0 ? energy.reduce((acc, val) => acc + val, 0) : 0;

    setSummary({
      dailyAverage,
      monthlyAverage,
      totalUsage
    });

    console.log('Summary calculated:', {
      dailyAverage,
      monthlyAverage,
      totalUsage
    }); // เพิ่มการตรวจสอบค่าที่คำนวณได้
  };

  const barChartData = {
    labels: data.timestamps ? Object.keys(data.timestamps) : [],
    datasets: [
      {
        label: 'การใช้พลังงาน (kWh)',
        data: data.energy ? Object.values(data.energy) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const barChartOptions = {
    maintainAspectRatio: false, // ปิดการรักษาสัดส่วน
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `การใช้พลังงาน: ${tooltipItem.raw} kWh`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="analysis">
      <h1>การวิเคราะห์ข้อมูลการใช้พลังงาน</h1>
      <div className="summary">
        <p>การใช้พลังงานเฉลี่ยต่อวัน: {summary.dailyAverage.toFixed(2)} kWh</p>
        <p>การใช้พลังงานเฉลี่ยต่อเดือน: {summary.monthlyAverage.toFixed(2)} kWh</p>
        <p>การใช้พลังงานรวม: {summary.totalUsage.toFixed(2)} kWh</p>
      </div>
      <div className="chart-container">
        <h2>กราฟการใช้พลังงานรายวัน</h2>
        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
