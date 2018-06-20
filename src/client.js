const io = require('socket.io-client')
const socket = io.connect(process.env.REACT_APP_API_URL)

function newUserEvent(user, callback) {
    socket.emit('new user', user, callback);
}

function userLogoutEvent(user, callback) {
    socket.emit('user logout', user, callback);
}

function sendMessageEvent(message, user, callback) {
    socket.emit('send message', message, user, callback);
}

function userLoggedIn(callback){
    socket.on('user logged in', callback)
}

function userLoggedOut(callback){
    socket.on('user logged out', callback)
}

function messageReceived(callback){
    socket.on('new message received', callback)
}

export {  
    newUserEvent,
    userLogoutEvent,
    sendMessageEvent,
    userLoggedIn,
    userLoggedOut,
    messageReceived
};
