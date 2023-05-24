const Users = require('../models/User');
const Post = require('../models/Post');

const getFeedPosts = async () => {
	try {
		const post = await Post.find();
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
const getUserPosts = async () => {
	try {
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
const likePost = async () => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);
		if (!isLiked) {
			post.likes.set(userId, true);
		} else {
			post.likes.delete(userId);
		}
		const updatedPost = await post.findByIdAndUpdate(id, post, { new: true });

		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
const createPost = async (req, res) => {
	try {
		const newPost = new Post({
			firstName: user.firstName,
			lastname: user.lastname,
			location: user.location,
			description,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			comments: {},
		});
		await newPost.save();

		const post = await Post.find();
		res.status(200).json(post);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

module.exports = {
	getFeedPosts,
	getUserPosts,
	likePost,
	createPost,
};
