const router = require('express').Router();
const {
	getUser,
	getUserFriends,
	addRemoveFriend,
} = require('../controllers/user');

//Read
router.route('/:id').get(getUser);
router.route('/:id/friends').get(getUserFriends);

//Update
router.route('/:id/:friendID').patch(addRemoveFriend);

module.exports = router;
