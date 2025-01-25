const {Router} = require('express');
const { Authenticate } = require('../midleware/authontication');
const { addPost, allPosts, userPosts, postById } = require('../controller/post.controller');

const router = Router();

router.post('/add-post' , Authenticate, addPost);
router.get('/all-post' , allPosts);
router.get('/user/:id' , userPosts);
router.get('/:id' , postById)

module.exports = router;