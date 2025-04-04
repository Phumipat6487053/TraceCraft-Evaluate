import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormEvaluate from './Components/Form-Evaluate';
import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      {/* แสดง Navbar บนทุกหน้า */}
      <Navbar />
      
      <Routes>
        {/* กำหนดเส้นทางสำหรับ FormEvaluate */}
        <Route path="/" element={<FormEvaluate />} />
        {/* ถ้าคุณไม่ต้องการเส้นทางนี้ ก็สามารถลบออกได้ */}
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
