const router = require('express').Router();
const { login, register } = require('../controllers/auth');
const upload = require('../middleware/upload');

router.route('/register').post(upload.single('picture'), register);
router.route('/login').post(login);

module.exports = router;
