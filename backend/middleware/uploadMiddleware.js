const multer = require('multer');

// Set up storage engine and file filter for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');},
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedRTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedRTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG, JPG and PNG is allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
