const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getKatalog = async (res) => {
  try {
    const products = await prisma.product.findMany({
      where: { is_active: true },
      orderBy: { name: 'asc' }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil katalog", error: error.message });
  }
};

exports.getDetailBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const products = await prisma.product.findMany({
      where: { 
        slug: slug, 
        is_active: true 
      }
    });

    if (products.length === 0) return res.status(404).json({ message: "Game tidak ditemukan" });
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};