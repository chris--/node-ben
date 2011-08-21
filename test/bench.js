var assert = require('assert');
var bend = require('../');

exports.parse = function () {
    var a = bend(1000, function () {
        JSON.parse('[1,2,3]')
    });
    assert.ok(a < 1);
    assert.ok(a > 0);
    
    var b = bend(function () {
        JSON.parse('[ 1 , 2 , 3 ]')
    });
    assert.ok(b < 1);
    assert.ok(b > 0);
    
    assert.ok(Math.abs(a - b) < 0.01);
    
    var c = bend(function () {
        eval('[1,2,3]')
    });
    assert.ok(c < 1);
    assert.ok(c > 0);
    
    assert.ok(Math.abs(a - c) < 0.1);
};
