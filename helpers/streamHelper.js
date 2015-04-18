var Q = require('q');
var apiConfig = require('config').get('twitterApi');
var Twit = require('twit');
var T = new Twit(apiConfig);

// general initialization done

// ## private methods 

var getBaseTweet = function (tweetId){
    var deferred = Q.defer();

    T.get('statuses/show', { id: tweetId }, function (err, tweetObj) {
        if (err) {
            deferred.reject(new Error('Wrong tweet id or API settings mismatch.' ));
        } else {
            deferred.resolve(tweetObj);
        }
    });

    return deferred.promise;
}


// ## private methods



// ## public methods

var streamHelper = {};


streamHelper.rtStream = function (callback){
    var tweetId = this.tweetId;
    getBaseTweet(tweetId).then(function (tweetObj){
        var user = tweetObj.user;
        
        // debug msg output !
        console.log("-> RT stream starting for  " + user.screen_name + " - " + tweetId);

        var stream = T.stream('statuses/filter', { follow: user.id_str })
        
        stream.on('tweet', function (streamTweetObj) {
            //  check the event type -> retweet
            
            if (streamTweetObj.hasOwnProperty('retweeted_status')) {
                // it's a retweet event !
                // -> check it's a retweet from tracking tweet

                if (streamTweetObj.retweeted_status.id_str == tweetId) {
                    callback(null, streamTweetObj);
                }
            }

        });

        stream.on('disconnect', function (disconnectMessage) {
            callback(disconnectMessage, null);
        })

        
    })
    .fail(function (err){
        callback(err, null);
    })
    
}


// ## public methods


module.exports = function (tweetId) {
    streamHelper.tweetId = tweetId;
    return streamHelper;
}
