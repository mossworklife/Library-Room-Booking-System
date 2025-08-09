//backend\src\routes\roomRoutes.js
// ไฟล์นี้กำหนดเส้นทาง API สำหรับห้อง

const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// GET /api/rooms/location/:locationId -> สำหรับดึงข้อมูลห้องจาก ID ของสถานที่
router.get('/location/:locationId', roomController.getRoomsByLocation);

router.get('/', roomController.getAllRooms); // GET /api/rooms
router.post('/', roomController.createRoom); // POST /api/rooms
router.put('/:id', roomController.updateRoom); // PUT /api/rooms/id
router.delete('/:id', roomController.deleteRoom); // DELETE /api/rooms/id

module.exports = router;