const route = require('express').Router();
const userController = require('../app/controllers/userController');
route.post('/register', userController.register);
route.post('/login', userController.login), route.get('/suggest', userController.getSuggest);
route.post('/suggested/:id', userController.suggested);
route.post('/unflow/:id', userController.unFlow);
route.get('/:username', userController.getUser);
route.get('/get-user-by-id/:id', userController.getUserById);
route.post('/:id/create-album', userController.createAlbum);
route.get('/search/:username', userController.searchUser);

//ex
module.exports = route;
