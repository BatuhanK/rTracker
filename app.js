var socketHelper = require('./helpers/socketHelper.js');
var mysqlHelper = require('./helpers/mysqlHelper.js');


// Let's start http server

var httpHelper = require('./helpers/httpHelper.js');



// Application login here

var streamHelper = require('./helpers/streamHelper.js')("589464954618703872");
streamHelper.rtStream(function (err, tweetObj) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log("-> New rt: " + tweetObj.user.screen_name);
        // insert to database ( check for exists etc. ) 
        mysqlHelper.insert(tweetObj, function (err, insertId){
            if (err) {
                console.log('New error', err);
            } else {
                // if successful send to users !
                socketHelper.broadcast(tweetObj);        
            }
        })
    }
});