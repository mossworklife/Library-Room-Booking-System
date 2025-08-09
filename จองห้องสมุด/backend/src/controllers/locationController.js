const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ดึงข้อมูลสถานที่ทั้งหมด
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      // เรียงตาม ID จากน้อยไปมาก
      orderBy: {
        id: 'asc',
      },
    });
    res.json(locations);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่:", error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
  }
};

// สร้างสถานที่ใหม่
exports.createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    const newLocation = await prisma.location.create({ data: { name } });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: 'ไม่สามารถสร้างสถานที่ได้' });
  }
};

// อัปเดตสถานที่
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedLocation = await prisma.location.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: 'ไม่สามารถอัปเดตสถานที่ได้' });
  }
};

// ลบสถานที่
exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.location.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); 
  } catch (error) {
    // Prisma จะ error เองถ้ามีห้องผูกอยู่กับสถานที่นี้
    res.status(400).json({ error: 'ไม่สามารถลบได้ เนื่องจากมีห้องอยู่ในสถานที่นี้' });
  }
};