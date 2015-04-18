var mysql = require('mysql');
var Q = require('q');
var mysqlConfig = require('config').get('mysql');
var pool = mysql.createPool(mysqlConfig);

// general initialization done

// ## private methods 

var getCount = function (userId){
    var deferred = Q.defer();

    pool.query("SELECT count(id) as total from retweeters where twitter_user_id = ?", [userId], function (err, results) {
        if (err) {
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(results[0].total);
        }
    });

    return deferred.promise;
}

var insertToDb = function (tweetObj,callback){
    var insertObj = {
        twitter_user_id: tweetObj.user.id_str,
        twitter_user_screen_name: tweetObj.user.screen_name,
        twitter_user_name:tweetObj.user.name,
        twitter_user_profile_picture: tweetObj.user.profile_image_url
    };

    pool.query("INSERT into retweeters set ?", insertObj, function (err, results){
        if (err) {
            callback(err, null);
        } else {
            callback(null, results.insertId);
        }
    })
}


// ## private methods 


// ## public methods

var mysqlHelper = {};




mysqlHelper.insert = function (tweetObj,callback){
    getCount(tweetObj.user.id_str).then(function (count) {
        if (count == 0) {
            // new rt :)
            insertToDb(tweetObj, function (err, insertId){
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, insertId);
                }
            })
        } else {
            callback(new Error("RT spam detected, ignoring..."), null);
        }
    })
    .fail(function (err){
        callback(err, null);
    })
}

mysqlHelper.getLastUsers = function (callback){
    pool.query("SELECT * from retweeters order by id desc", function (err, results){
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
} 


// ## public methods


module.exports = mysqlHelper;
