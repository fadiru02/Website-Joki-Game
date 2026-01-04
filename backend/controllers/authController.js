const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const prisma = new PrismaClient({
  log: ['error', 'warn'], 
});

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email dan password harus diisi!" 
            });
        }

        const userExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userExists) {
            return res.status(400).json({ 
                message: "Email sudah terdaftar!" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        });

        console.log("User tersimpan di MySQL:", newUser.email);
        res.status(201).json({ 
            message: "User berhasil didaftarkan ke Database",
            user: {
                id: newUser.id,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error Register:", error);
        res.status(500).json({ 
            message: "Terjadi kesalahan database saat register",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password harus diisi!" });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: "Email atau Password salah" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email atau Password salah" });
        }

       
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({
            message: "Login Berhasil",
            token,
            role: user.role, 
            user: {
                id: user.id,
                email: user.email,
                role: user.role 
            }
        });

    } catch (error) {
        console.error("Error Login:", error);
        res.status(500).json({ message: "Terjadi kesalahan database saat login" });
    }
};

process.on('beforeExit', async () => {
    await prisma.$disconnect();
});