import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const supportFormat = /jpg|jpeg|png/;

    const isValid =
        supportFormat.test(path.extname(file.originalname).toLowerCase()) &&
        supportFormat.test(file.mimetype);

    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only jpg, jpeg and png files are allowed"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

export default upload;