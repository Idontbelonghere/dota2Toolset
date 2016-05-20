var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbURI = 'mongodb://localhost:27017/toolset';



router.get('/get10kInfos', function(req, res, next) {
    var qsurl = url.parse(req.url).query;

    MongoClient.connect(dbURI, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('tenKInfo').find();
        cursor.toArray().then(function(data) {
            res.send(data);
            db.close()
        })
    })
})

router.post('/save_A_TeamBetInfo', function(req, res, next) {
    var qsurl = url.parse(req.url).query;
    var data = qs.parse(qsurl)['Info'];
    var tgt = JSON.parse(data);
    MongoClient.connect(dbURI, function(err, db) {
        db.collection('bet_team_Info').insert(tgt, function(err1, res1) {
            console.log('Insert one Team Info.');
            var resMsg = {
              'status':1,
              'msg':'TeamInfo Inserted.'
            };
            res.send(resMsg);
            db.close();
        })
    })
})


module.exports = router;



