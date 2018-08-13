const MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb://EwanBd:Miyazaki1@ds131721.mlab.com:31721/meanhotel';
var _connection = null;

var open = function () {
  // set connection
  MongoClient.connect(dburl, function (err, db) {
      if(err) {
          console.log("DB Failed to connect");
          return;
      }
      _connection = db.db('meanhotel');
      console.log("DB connection open", db);
  });
};

var get = function () {
  return _connection;
};

var post = function () {
  return _connection
};


module.exports = {
    open : open,
    get : get
};
