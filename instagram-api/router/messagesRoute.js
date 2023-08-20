const route = require('express').Router();
const messageController = require('../app/controllers/messageController');
route.post('/addmsg', messageController.addMessages);
route.post('/getmsg', messageController.getMessages);
module.exports = route;
