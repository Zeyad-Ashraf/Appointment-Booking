import multer from "multer";


export const fileTypes = {
    image: ["image/png", "image/jpeg", "image/jpg"]
}


export const multerWithCloudinary = (fileType) => {

    const storage = multer.diskStorage({});

    function fileFilter(req, file, cb) {
        if (!fileType.includes(file.mimetype)) {
            return cb(new Error("File type not allowed",{cause:400}), false);
        }
        return cb(null, true);

    }

    const upload = multer({ storage, fileFilter });

    return upload;

}

