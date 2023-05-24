const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, res, cb) {
		cb(null, "public/assets");
	},
	filename: function (req, res, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

module.exports = upload; 
