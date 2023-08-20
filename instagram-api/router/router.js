const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const messRoute = require('./messagesRoute');
function router(app) {
    app.use('/api/user', userRoute);
    app.use('/post', postRoute);
    app.use('/api/message', messRoute);
}
module.exports = router;
