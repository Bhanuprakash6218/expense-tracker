const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const { registeredUser, loginUser, getUserProfile } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/register', registeredUser);
router.post('/login', loginUser);
router.get('/getUser', protect, getUserProfile);
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;
