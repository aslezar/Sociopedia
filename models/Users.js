const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: [true, 'Must Provide First Name'],
			trim: true,
			minlength: [2, 'First Name must have 2 characters'],
			maxlength: [50, 'First Name can not exceed 50 characters'],
		},
		lastname: {
			type: String,
			required: [true, 'Must Provide Last Name'],
			trim: true,
			minlength: [2, 'Last Name must have 2 characters'],
			maxlength: [50, 'Last Name can not exceed 50 characters'],
		},
		email: {
			type: String,
			required: [true, 'Must Provide Email'],
			trim: true,
			required: [true, 'Please provide email.'],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please provide valid email.',
			],
		},
		password: {
			type: String,
			required: [true, 'Must Provide Password'],
			unique: true,
			minlength: [8, 'Password must have 8 characters'],
			maxlength: [32, 'Password can not exceed 32 characters'],
		},
		picturePath: {
			type: String,
			default: '',
		},
		friends: {
			type: Array,
			default: [],
		},
		location: String,
		occupation: String,
		viewedProfiles: Number,
		impressions: Number,
	},
	{ timestamps: true }
);

// UserSchema.pre('save', async function (next) {
// 	const salt = await bcrypt.genSalt(10);
// 	this.password = await bcrypt.hash(this.password, salt);
// 	next();
// });

UserSchema.methods.generateToken = function () {
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};

module.exports = new mongoose.model('User', UserSchema);
