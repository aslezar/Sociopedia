//Express App
const express = require('express');
const app = express();

//Imports
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./db/connect');

//Routers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

//Configurations
dotenv.config();

//Middleware
app.use(express.json({ limit: '30mb' }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
const verifyToken = require('./middleware/auth');

//Static assets
app.use('/assets', express.static('public/assets'));

//Routes
app.get('/', (req, res) => {
	res.send('Hello!');
});
app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes);
app.use('/posts', verifyToken, postRoutes);

//Starting Server
const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log('Connected to the DB...');
		app.listen(
			PORT,
			console.log(`Server is listening on http://localhost:${PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
};
start();
