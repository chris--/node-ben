var test = require('tap').test;
var ben = require('../');

test('suiteAsync', function (t) {
    var test1 = function (fn) {
        setTimeout(fn, 10);
    };
    var test2 = function (fn) {
        setTimeout(fn, 20);
    };
    
    t.plan(4);
    ben.suiteAsync(100, [test1, test2], function (results) {
        t.ok(results[0].ms >= 10);
        t.ok(results[0].ms < 11);
        t.ok(results[1].ms >= 20);
        t.ok(results[1].ms < 21);
        t.end();
    });
});