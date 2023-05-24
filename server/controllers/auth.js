const bcryptjs = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const register = async (req, res) => {
	try {
		const {
			firstName,
			lastname,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation,
		} = req.body;
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const newUser = await User.create({
			firstName,
			lastname,
			email,
			password: hashedPassword,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfiles: Math.floor(Math.random() * 1000),
			impressions: Math.floor(Math.random() * 1000),
		});
		res.status(StatusCodes.CREATED).json(newUser); // 201
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "User doesn't exist." });
		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'Invalid Credentials' });
		const token = user.generateToken(); //generate token
		delete user.password;
		res.status(StatusCodes.OK).json({ user, token });
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.message });
	}
};
module.exports = { register, login };
