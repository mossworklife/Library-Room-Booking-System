// ไฟล์นี้กำหนดเส้นทาง API สำหรับสถานที่

const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// GET /api/locations -> สำหรับดึงข้อมูลสถานที่ทั้งหมด
router.get('/', locationController.getAllLocations);

router.post('/', locationController.createLocation);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);


module.exports = router;