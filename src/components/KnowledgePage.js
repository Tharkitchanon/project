import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: #e0f2f1; /* พื้นหลังสีเขียวอ่อน */
  color: #333;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* ทำให้สามารถเลื่อนดูเนื้อหาได้ */
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 20px;
  color: #00796b; /* สีฟ้าสำหรับหัวข้อหลัก */
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 900px;
  text-align: left;
  margin-bottom: 40px;
  background: #ffffff; /* พื้นหลังสีขาวสำหรับเนื้อหา */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
  color: #004d40; /* สีเขียวเข้ม */
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  border-bottom: 2px solid #004d40;
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  color: #555;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  color: #444;
`;

const Footer = styled.footer`
  font-size: 0.9rem;
  color: #00796b;
  margin-top: 20px;
`;

const KnowledgePage = () => {
  return (
    <PageContainer>
      <Title>คู่มือการประหยัดไฟ</Title>
      
      <Content>
        <Section>
          <SectionTitle>1. การประหยัดพลังงานไฟฟ้าในบ้าน</SectionTitle>
          <Paragraph>
            การประหยัดพลังงานไฟฟ้าสำหรับบ้านสามารถทำได้โดยการใช้เทคนิคต่างๆ ที่จะช่วยลดการใช้พลังงานและค่าใช้จ่าย:
          </Paragraph>
          <List>
            <ListItem>ปิดไฟและเครื่องใช้ไฟฟ้าเมื่อไม่ใช้งาน</ListItem>
            <ListItem>ใช้หลอดไฟ LED ที่มีประสิทธิภาพสูงกว่า</ListItem>
            <ListItem>เปลี่ยนเครื่องใช้ไฟฟ้าที่เก่าและไม่ประหยัดพลังงาน</ListItem>
            <ListItem>ติดตั้งอุปกรณ์ที่สามารถควบคุมการใช้พลังงาน เช่น ปลั๊กไฟอัจฉริยะ</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>2. การประหยัดพลังงานไฟฟ้าในสำนักงาน</SectionTitle>
          <Paragraph>
            สำหรับสำนักงาน การประหยัดพลังงานไฟฟ้าสามารถทำได้โดย:
          </Paragraph>
          <List>
            <ListItem>ใช้ระบบแสงสว่างที่มีประสิทธิภาพและควบคุมการเปิด-ปิดได้</ListItem>
            <ListItem>ใช้เครื่องใช้ไฟฟ้าที่มีฉลากประหยัดพลังงาน</ListItem>
            <ListItem>จัดการการใช้พลังงานในสำนักงานด้วยระบบอัตโนมัติ</ListItem>
            <ListItem>จัดอบรมพนักงานให้ตระหนักถึงความสำคัญของการประหยัดพลังงาน</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. เทคนิคการประหยัดพลังงานเพิ่มเติม</SectionTitle>
          <Paragraph>
            นอกจากการปรับเปลี่ยนพฤติกรรมและการใช้เครื่องใช้ไฟฟ้าอย่างมีประสิทธิภาพแล้ว ยังมีเทคนิคเพิ่มเติมที่สามารถช่วยประหยัดพลังงานได้:
          </Paragraph>
          <List>
            <ListItem>ติดตั้งระบบพลังงานแสงอาทิตย์</ListItem>
            <ListItem>ใช้พัดลมในการช่วยระบายอากาศแทนการใช้เครื่องปรับอากาศ</ListItem>
            <ListItem>ทำความสะอาดเครื่องใช้ไฟฟ้าเพื่อให้ทำงานได้เต็มประสิทธิภาพ</ListItem>
            <ListItem>ใช้เครื่องใช้ไฟฟ้าที่มีระบบพลังงานทดแทน</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. การวิเคราะห์และติดตามการใช้พลังงาน</SectionTitle>
          <Paragraph>
            การวิเคราะห์และติดตามการใช้พลังงานเป็นสิ่งสำคัญในการประหยัดพลังงาน:
          </Paragraph>
          <List>
            <ListItem>ติดตั้งเครื่องวัดการใช้พลังงานไฟฟ้า</ListItem>
            <ListItem>ตรวจสอบและบันทึกข้อมูลการใช้พลังงานเป็นระยะๆ</ListItem>
            <ListItem>ใช้ซอฟต์แวร์หรือแอปพลิเคชันในการติดตามและวิเคราะห์การใช้พลังงาน</ListItem>
          </List>
        </Section>
      </Content>

      <Footer>
        &copy; 2024 ข้อมูลเกี่ยวกับการประหยัดพลังงาน
      </Footer>
    </PageContainer>
  );
};

export default KnowledgePage;
