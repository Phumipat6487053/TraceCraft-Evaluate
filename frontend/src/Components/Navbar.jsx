import React from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom'; // หากใช้ React Router ให้ uncomment บรรทัดนี้

// --- Styled Components ---

const Nav = styled.nav`
  background-color: #2c3e50; /* สีพื้นหลัง Navbar (ปรับตามธีมของคุณ) */
  color: #ecf0f1; /* สีข้อความหลัก */
  padding: 0.8rem 0; /* ระยะห่างภายในแนวตั้ง */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky; /* ทำให้ Navbar ติดด้านบนเมื่อ scroll */
  top: 0;
  z-index: 1000; /* ทำให้อยู่เหนือ element อื่น */
`;

const NavContainer = styled.div`
  max-width: 1200px; /* ความกว้างสูงสุดของเนื้อหา Navbar */
  margin: 0 auto; /* จัดกึ่งกลาง */
  padding: 0 2rem; /* ระยะห่างภายในแนวนอน */
  display: flex;
  justify-content: space-between; /* จัดให้อยู่คนละฝั่ง (Logo/Brand vs Links/User) */
  align-items: center; /* จัดให้อยู่กึ่งกลางแนวตั้ง */
`;

const Brand = styled.a` /* หรือใช้ Link จาก react-router-dom */
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff; /* สี Brand อาจจะเด่นกว่า */
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* ระยะห่างระหว่าง logo (ถ้ามี) กับ text */

  /* ถ้าต้องการใส่ Logo รูปภาพ */
  /* img {
    height: 30px; // ปรับขนาดตามต้องการ
    margin-right: 0.5rem;
  } */

  &:hover {
    color: #bdc3c7; /* สีตอน hover */
  }
`;

const Navbar = () => {
  // หากใช้ React Router อาจต้องใช้ hook เช่น useLocation เพื่อดู path ปัจจุบันสำหรับ Active Link

  return (
    <Nav>
      <NavContainer>
        {/* ส่วน Logo หรือ ชื่อแบรนด์ */}
        <Brand href="/"> {/* หรือใช้ <Link to="/"> */}
          {/* <img src="/path/to/your/logo.png" alt="TraceCraft Logo" /> */}
          TraceCraft
        </Brand>

        {/* อาจจะเพิ่มปุ่ม Hamburger Menu สำหรับจอเล็กตรงนี้ */}

      </NavContainer>
    </Nav>
  );
}

export default Navbar;