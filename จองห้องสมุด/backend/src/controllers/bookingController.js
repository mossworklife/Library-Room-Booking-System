//backend\src\controllers\bookingController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// USER - ดึงข้อมูลการจองสำหรับห้องและวันที่ระบุ
exports.getBookingsByRoomAndDate = async (req, res) => {
  try {
    const { roomId, date } = req.params;

    // ดึงเฉพาะการจองที่ยังไม่ถูกปฏิเสธ
    const bookings = await prisma.booking.findMany({
      where: {
        roomId: parseInt(roomId),
        date: new Date(date),
        status: {
          not: 'REJECTED',
        },
      },
      orderBy: {
        startTime: 'asc', // เรียงตามเวลาเริ่มต้น
      },
    });
    res.json(bookings);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการจองตามวัน:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
  }
};


// USER - สร้างคำขอจองใหม่
exports.createBooking = async (req, res) => {
  try {
    const { userName, userPhone, userEmail, date, startTime, endTime, roomId } = req.body;
    
    // Validation 
    if (!userName || !userPhone || !date || !startTime || !endTime || !roomId) {
      return res.status(400).json({ error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
    }

    const newBooking = await prisma.booking.create({
      data: {
        userName,
        userPhone,
        userEmail,
        date: new Date(date), // แปลง string เป็น Date object
        startTime,
        endTime,
        roomId: parseInt(roomId),
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้างการจอง:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
  }
};

// ADMIN - ดึงข้อมูลการจองทั้งหมด 
exports.getAllBookings = async (req, res) => {
    try {
        const { status, date, sortBy = 'createdAt', order = 'desc' } = req.query;
        
        const whereClause = {};

        // กรองตามสถานะ
        if (status && status !== 'all') {
            whereClause.status = status.toUpperCase();
        }

        // กรองตามวันที่ 
        if (date) {
            whereClause.date = new Date(date);
        }

        const bookings = await prisma.booking.findMany({
            where: whereClause, 
            include: {
                room: {
                    include: {
                        location: true,
                    },
                },
            },
            orderBy: {
                [sortBy]: order,
            },
        });
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
};

// [ADMIN] อัปเดตสถานะการจอง (อนุมัติ/ไม่อนุมัติ)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'APPROVED' หรือ 'REJECTED'

    if (!['APPROVED', 'REJECTED'].includes(status)) {
        return res.status(400).json({ error: 'สถานะไม่ถูกต้อง' });
    }
    
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดต' });
  }
};
