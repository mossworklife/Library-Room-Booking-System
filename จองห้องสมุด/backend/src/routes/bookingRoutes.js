//backend\src\routes\bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// เส้นทางสำหรับผู้ใช้ทั่วไป
router.post('/', bookingController.createBooking); // POST /api/bookings -> สร้างการจอง
router.get('/room/:roomId/date/:date', bookingController.getBookingsByRoomAndDate); // -> สร้างการจองเวลา

// เส้นทางสำหรับ Admin
router.get('/', bookingController.getAllBookings); // GET /api/bookings -> ดูการจองทั้งหมด (มี filter)
router.patch('/:id/status', bookingController.updateBookingStatus); // PATCH /api/bookings/1/status -> อัปเดตสถานะ

module.exports = router;