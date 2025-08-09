// backend\src\controllers\roomController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ดึงข้อมูลห้องตาม locationId
exports.getRoomsByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const rooms = await prisma.room.findMany({
      where: {
        locationId: parseInt(locationId),
      },
      orderBy: {
        name: 'asc',
      },
    });
    res.json(rooms);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้อง:", error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
  }
};

// ดึงข้อมูลห้องทั้งหมดพร้อมข้อมูลสถานที่
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        location: true, 
      },
      orderBy: { id: 'asc' },
    });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้อง' });
  }
};

// สร้างห้องใหม่
exports.createRoom = async (req, res) => {
  try {
    const { name, capacity, facilities, locationId } = req.body;
    const newRoom = await prisma.room.create({
      data: {
        name,
        capacity: parseInt(capacity),
        facilities,
        locationId: parseInt(locationId),
      },
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างห้อง' });
  }
};

// อัปเดตข้อมูลห้อง
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity, facilities, locationId } = req.body;
    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(id) },
      data: {
        name,
        capacity: parseInt(capacity),
        facilities,
        locationId: parseInt(locationId),
      },
    });
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตห้อง' });
  }
};

// ลบห้อง
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.room.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบห้อง' });
  }
};