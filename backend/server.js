const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer'); // ถ้าไม่ได้ใช้ upload ไฟล์กับ endpoint นี้ อาจไม่จำเป็นต้อง import
const mysql = require('mysql');
const cors = require('cors');
const app = express();
// const fs = require("fs"); // อาจไม่จำเป็นถ้าไม่ได้จัดการไฟล์โดยตรง
// const router = express.Router(); // ถ้าจะใช้ router ให้ตั้งค่าให้เรียบร้อย

// Middleware
app.use(cors()); // อนุญาต Cross-Origin Requests (สำคัญมากสำหรับ React Frontend)
app.use(express.json()); // สำหรับ Parse JSON request body
app.use(bodyParser.json()); // ซ้ำกับ express.json เลือกใช้อย่างใดอย่างหนึ่ง
app.use(bodyParser.urlencoded({ extended: true })); // สำหรับ Parse URL-encoded request body
// app.use('/files', express.static(path.join(__dirname, 'uploads')));

// ตั้งค่า multer (ถ้าไม่ได้ใช้ upload ไฟล์ใน endpoint นี้ สามารถลบส่วนนี้ได้)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Database Connection (เหมือนเดิม)
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",          // ควรใช้ Environment Variables ใน Production
    database: "tracecraft_evaluate"
});

// Test Database Connection (เหมือนเดิม)
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', db.threadId);
});

// --- NEW API ENDPOINT ---
// POST /api/evaluations - รับข้อมูลและบันทึกลงฐานข้อมูล
app.post('/api/evaluations', (req, res) => {
    console.log("Received data:", req.body); // Log ข้อมูลที่ได้รับเพื่อ Debug

    // ดึงข้อมูลจาก Request Body
    const {
        name,
        position,
        jobDescription, // ชื่อ key ตรงกับ Frontend
        isoFamiliarity,
        susAnswers,     // เป็น Object { sus1: value, sus2: value, ... }
        suggestions
    } = req.body;

    // --- Server-Side SUS Score Calculation ---
    // **สำคัญ:** คำนวณคะแนน SUS ที่ฝั่ง Backend เสมอ เพื่อความถูกต้องและปลอดภัย
    // ไม่ควรเชื่อค่าคะแนนที่ส่งมาจาก Frontend โดยตรง
    let calculatedSusScore = 0;
    if (susAnswers && typeof susAnswers === 'object') {
        const oddKeys = ['sus1', 'sus3', 'sus5', 'sus7', 'sus9'];
        const evenKeys = ['sus2', 'sus4', 'sus6', 'sus8', 'sus10'];
        let partialScore = 0;

        oddKeys.forEach(key => {
            const value = parseInt(susAnswers[key], 10);
            if (!isNaN(value) && value >= 1 && value <= 5) {
                partialScore += (value - 1);
            }
        });

        evenKeys.forEach(key => {
            const value = parseInt(susAnswers[key], 10);
            if (!isNaN(value) && value >= 1 && value <= 5) {
                partialScore += (5 - value);
            }
        });

        calculatedSusScore = partialScore * 2.5;
    } else {
        // จัดการกรณี susAnswers ไม่ถูกต้อง (อาจส่ง error กลับไป)
        console.error("Invalid susAnswers format received:", susAnswers);
        return res.status(400).json({ message: 'Invalid SUS answers format.' });
    }

    // --- เตรียมข้อมูลสำหรับ INSERT ---
    // ตรวจสอบว่า susAnswers มี key ครบ 10 ข้อหรือไม่ (เพื่อป้องกัน error ตอน INSERT)
    const requiredSusKeys = ['sus1', 'sus2', 'sus3', 'sus4', 'sus5', 'sus6', 'sus7', 'sus8', 'sus9', 'sus10'];
    const hasAllSusKeys = susAnswers && requiredSusKeys.every(key => susAnswers.hasOwnProperty(key) && susAnswers[key] !== null);

    if (!name || !position || !isoFamiliarity || !hasAllSusKeys) {
        console.error("Missing required fields:", { name, position, isoFamiliarity, hasAllSusKeys });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    // สร้าง SQL Query สำหรับ INSERT ข้อมูล
    const sql = `
        INSERT INTO evaluations
        (name, position, job_description, iso_familiarity,
         sus1, sus2, sus3, sus4, sus5, sus6, sus7, sus8, sus9, sus10,
         suggestions, sus_score)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // สร้าง Array ของค่าที่จะใส่ลงใน Query (ต้องเรียงลำดับให้ตรงกับ ? ใน SQL)
    const values = [
        name,
        position,
        jobDescription || null, // ถ้าไม่มีค่า ให้ใส่ null
        parseInt(isoFamiliarity, 10), // แปลงเป็นตัวเลข
        parseInt(susAnswers.sus1, 10),
        parseInt(susAnswers.sus2, 10),
        parseInt(susAnswers.sus3, 10),
        parseInt(susAnswers.sus4, 10),
        parseInt(susAnswers.sus5, 10),
        parseInt(susAnswers.sus6, 10),
        parseInt(susAnswers.sus7, 10),
        parseInt(susAnswers.sus8, 10),
        parseInt(susAnswers.sus9, 10),
        parseInt(susAnswers.sus10, 10),
        suggestions || null, // ถ้าไม่มีค่า ให้ใส่ null
        calculatedSusScore // ใช้คะแนนที่คำนวณจาก Backend
    ];

    // Execute Query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            // ส่ง Error กลับไปให้ Frontend
            return res.status(500).json({ message: 'Database insertion failed.', error: err });
        }

        console.log('Data inserted successfully, ID:', result.insertId);
        // ส่ง Response สำเร็จกลับไปให้ Frontend
        res.status(201).json({ // 201 Created
            message: 'Evaluation submitted successfully!',
            insertedId: result.insertId,
            calculatedSusScore: calculatedSusScore // ส่งคะแนนที่คำนวณกลับไปด้วย (ถ้าต้องการ)
        });
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 3001; // ใช้ Port 3001 หรือ Port จาก Environment Variable
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});