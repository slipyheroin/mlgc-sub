const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// Multer setup untuk upload file
const upload = multer({
    limits: { fileSize: 1000000 }, // Batas ukuran file 1MB
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File harus berupa gambar (jpg/jpeg/png)'));
        }
        cb(null, true);
    }
});

// Endpoint untuk prediksi
app.post('/predict', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                status: 'fail',
                message: 'Tidak ada file gambar yang diunggah',
            });
        }

        // Dummy prediksi (ganti dengan model Anda jika sudah ada)
        const isCancer = Math.random() > 0.5; // Random untuk testing
        const result = isCancer ? 'Cancer' : 'Non-cancer';
        const suggestion = isCancer
            ? 'Segera periksa ke dokter!'
            : 'Anda sehat!';

        // Buat response
        const response = {
            status: 'success',
            message: 'Model is predicted successfully',
            data: {
                id: uuidv4(),
                result,
                suggestion,
                createdAt: new Date().toISOString(),
            },
        };

        // Kirim response
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message || 'Terjadi kesalahan dalam melakukan prediksi',
        });
    }
});

// Error handler
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            status: 'fail',
            message: 'Payload content length greater than maximum allowed: 1000000',
        });
    }
    next(error);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
