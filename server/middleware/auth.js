const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	try {
		const token = req.headers('Authorization');
		if (!token) {
			return res.status(403).json({ msg: 'You are not authorized' });
		}
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length).trimLeft();
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
module.exports = verifyToken;
