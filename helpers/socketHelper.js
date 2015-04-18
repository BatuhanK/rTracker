var app = require('http').createServer();
var io = require('socket.io')(app);

var socketPort = require('config').get('socketPort');

// general initialization done


// ## public methods

var socketHelper = {};


socketHelper.broadcast = function (data){
    io.sockets.emit('new_retweet', data);
}



// ## public methods

module.exports = socketHelper;
app.listen(socketPort);


console.log("### SOCKET SERVER STARTED: " + socketPort);


