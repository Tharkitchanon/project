import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from './ตราสัญลักษณ์โรงเรียนชุมแพศึกษา.jpg'; 
import profilePic from './80049447_604546740353064_3161278354296930304_n.jpg';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #ffffff;
  overflow: hidden;
  position: relative;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  animation: ${pulse} 4s infinite, ${fadeIn} 1s ease-in-out;
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: #bb86fc;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #121212;
  background-color: #bb86fc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${fadeIn} 2s ease-in-out;
  margin: 10px;

  &:hover {
    background-color: #3700b3;
    transform: scale(1.05);
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 20px;
  font-size: 0.8rem;
  color: #888;
  animation: ${fadeIn} 2.5s ease-in-out;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  z-index: -1;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #121212;
  color: #ffffff;
  box-shadow: -2px 0 5px rgba(0,0,0,0.3);
  transform: translateX(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const UserEmail = styled.p`
  font-size: 1.1rem;
  color: #bb86fc;
`;

const SidebarHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SidebarLink = styled(Link)`
  display: block;
  color: #bb86fc;
  text-decoration: none;
  font-size: 1.2rem;
  margin: 10px 0;

  &:hover {
    color: #3700b3;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #bb86fc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1000;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3700b3;
  }
`;

const AnalysisButton = styled(Link)`
  position: absolute;
  top: 20px;
  right: 80px; /* Adjust button position */
  background-color: #bb86fc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 1000;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #018786;
  }
`;

const ElectricityDisplayButton = styled(Link)`
  position: absolute;
  top: 20px; /* Adjust button position */
  left: 20px; /* Adjust button position */
  background-color: #bb86fc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 1000;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #018786;
  }
`;

const AiButton = styled(Link)`
  position: absolute;
  top: 20px; /* ปรับตำแหน่งปุ่ม */
  left: 150px; /* ปรับตำแหน่งปุ่ม */
  background-color: #bb86fc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 1000;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #018786;
  }
`;

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <HomePageContainer>
      <Background />
      <Logo src={logo} alt="Logo" />
      <Header>ยินดีต้อนรับเข้าสู่ระบบตรวจสอบข้อมูลไฟฟ้า</Header>
      <SubHeader>แสดงและวิเคราะห์ข้อมูลไฟฟ้าของคุณ</SubHeader>
      <Button as={Link} to="/dashboard">ไปที่แดชบอร์ด</Button>
      <ElectricityDisplayButton to="/electricity">แสดงค่าไฟฟ้า</ElectricityDisplayButton>
      <AiButton to="/Ai">คาดการณ์</AiButton> {/* ปุ่มเชื่อมโยงไปยังหน้า Ai */}
      <Footer>&copy; 2024 รอยคิดถึงแฟนเก่า.</Footer>
      
      <MenuButton onClick={toggleSidebar}>
        &#9776; {/* Menu icon */}
      </MenuButton>

      <AnalysisButton to="/Analysis">
        การวิเคราะห์
      </AnalysisButton>

      <Sidebar ref={sidebarRef} isOpen={sidebarOpen}>
        <ProfileSection>
          <ProfilePic src={profilePic} alt="Profile Picture" />
          <UserEmail>user@example.com</UserEmail>
        </ProfileSection>
        <SidebarHeader>ข้อมูลผู้ใช้</SidebarHeader>
        <SidebarLink to="/profile">โปรไฟล์</SidebarLink>
        <SidebarLink to="/settings">การตั้งค่า</SidebarLink>
      </Sidebar>
    </HomePageContainer>
  );
}

export default HomePage;
