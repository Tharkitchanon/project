import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css'; // ตรวจสอบให้แน่ใจว่าได้เพิ่ม CSS ที่ได้กล่าวถึง

const messages = [
  "ปรับแอร์ขึ้น1-2องศาก็ถือว่าประหยัดไฟแล้วน้า",
  "ถ้าไม่ใช้ไฟก็ถอดปลั๊ก ถ้าเขาไม่รักก็ถอดใจ",
  "ประหยัดไฟกี่โมง",
  "ปิดน้ำ ปิดไฟ ปิดทำไมบ้านผมรวย",
  "ในโคมมีแต่ไฟในใจมีแต่เธอ"
];

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};


const Dashboard = () => {
  const [data, setData] = useState({});
  const [selectedDevice, setSelectedDevice] = useState('DEVICE001');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const dataRef = ref(db, `devices/${selectedDevice}/data`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data || {});
    });
  }, [selectedDevice]);

  useEffect(() => {
    // Set message and start interval for displaying messages every 30 seconds
    setMessage(getRandomMessage());
    const messageInterval = setInterval(() => {
      setShowMessage(prev => !prev);
      if (showMessage) {
        setMessage(getRandomMessage());
      }
    }, 30000); // 30000ms = 30 seconds

    return () => clearInterval(messageInterval);
  }, [showMessage]);

  const timestamps = data.timestamps ? Object.values(data.timestamps) : [];
  const voltage = data.voltage ? Object.values(data.voltage) : [];
  const current = data.current ? Object.values(data.current) : [];
  const power = data.power ? Object.values(data.power) : [];
  const energy = data.energy ? Object.values(data.energy) : [];
  const powerFactor = data.powerFactor ? Object.values(data.powerFactor) : [];

  const generateChartData = (label, data, borderColor) => ({
    labels: timestamps,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: borderColor,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: data.map(v => v > 80 ? 'rgba(255, 99, 132, 1)' : borderColor),
        pointBorderColor: data.map(v => v > 80 ? 'rgba(255, 99, 132, 1)' : borderColor),
        pointRadius: 4
      }
    ]
  });

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          maxTicksLimit: 10
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
          stepSize: 20
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
  };

  const renderValue = (label, value) => {
    const valueColor = value > 80 ? 'red' : '#ffffff';

    return (
      <div className="value-container">
        <h2>{label}</h2>
        <p style={{ color: valueColor }}>{value}</p>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h1>การแสดงผลข้อมูลไฟฟ้า</h1>
      <div className="message-container">
        {showMessage && (
          <div className="message-box">
            <p>{message}</p>
          </div>
        )}
      </div>
      <div className="device-selector">
        <label>เลือกอุปกรณ์:</label>
        <select onChange={(e) => setSelectedDevice(e.target.value)} value={selectedDevice}>
          <option value="DEVICE001">อุปกรณ์ 1</option>
          <option value="DEVICE002">อุปกรณ์ 2</option>
          <option value="DEVICE003">อุปกรณ์ 3</option>
          {/* เพิ่มอุปกรณ์เพิ่มเติมที่นี่ */}
        </select>
      </div>
      <div className="chart-container">
        {renderValue('แรงดันไฟฟ้าล่าสุด', voltage[voltage.length - 1])}
        <Line data={generateChartData('แรงดันไฟฟ้า', voltage, 'rgba(75, 192, 192, 1)')} options={chartOptions} />
      </div>
      <div className="chart-container">
        {renderValue('กระแสไฟฟ้าล่าสุด', current[current.length - 1])}
        <Line data={generateChartData('กระแสไฟฟ้า', current, 'rgba(153, 102, 255, 1)')} options={chartOptions} />
      </div>
      <div className="chart-container">
        {renderValue('กำลังไฟฟ้าล่าสุด', power[power.length - 1])}
        <Line data={generateChartData('กำลังไฟฟ้า', power, 'rgba(255, 159, 64, 1)')} options={chartOptions} />
      </div>
      <div className="chart-container">
        {renderValue('พลังงานไฟฟ้าล่าสุด', energy[energy.length - 1])}
        <Line data={generateChartData('พลังงานไฟฟ้า', energy, 'rgba(54, 162, 235, 1)')} options={chartOptions} />
      </div>
      <div className="chart-container">
        {renderValue('ค่า power factor ล่าสุด', powerFactor[powerFactor.length - 1])}
        <Line data={generateChartData('ค่า power factor', powerFactor, 'rgba(255, 206, 86, 1)')} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
