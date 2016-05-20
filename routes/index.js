var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbURI = 'mongodb://localhost:27017/toolset';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ToolSet' });
});

router.get('/schedule', function(req, res, next) {
    res.render('schedule', { title: 'SCHEDULE' }, function(err, html) {
        res.send(html);
    });
});
router.get('/teaminfo', function(req, res, next) {
    res.render('teaminfo', { title: 'Team Info' }, function(err, html) {
        res.send(html);
    });
});
router.get('/10kills', function(req, res, next) {
    res.render('10killsCollector', { title: '10 kills Collector' }, function(err, html) {
        res.send(html);
    });
});

router.get('/damnshit', function(req, res, next) {
    res.render('damnshit', { title: 'damnshit Teams' });
});

router.get('/betProfit', function(req, res, next) {
    MongoClient.connect(dbURI, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('bet_team_Info').find();
        cursor.toArray().then(function(data) {
            res.render('betProfit', {
                "data": data,
            }, function(err1, html) {
                res.send(html);
            });
        })
    })
});
module.exports = router;
