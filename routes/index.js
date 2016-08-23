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
            data.forEach(function(val,index,arr){
                val.tkProfit = Number(val.tkProfit.toFixed(2));
                val.tkInvest = Number(val.tkInvest.toFixed(2));
                val.wgProfit = Number(val.wgProfit.toFixed(2));
                val.wgInvest = Number(val.wgInvest.toFixed(2));
                val.profit = Number(val.profit.toFixed(2));
                val.invest = Number(val.invest.toFixed(2));
            })
            res.render('betProfit', {
                "data": data,
            }, function(err1, html) {
                res.send(html);
            });
        })
    })
});
module.exports = router;
