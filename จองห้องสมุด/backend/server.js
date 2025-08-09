require('dotenv').config(); // โหลดค่าจาก .env
const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./src/routes/bookingRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const roomRoutes = require('./src/routes/roomRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// iddlewares 
app.use(cors()); // อนุญาตให้ Frontend เรียกใช้งานได้
app.use(express.json()); // แปลง Request Body ที่เป็น JSON

// API
app.use('/api/bookings', bookingRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/rooms', roomRoutes);

// Server Startup
app.listen(PORT, () => {
  console.log(`🚀 Backend server กำลังทำงานที่ http://localhost:${PORT}`);
});