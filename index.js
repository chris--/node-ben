var ben = module.exports = function (times, cb) {
    if (typeof times === 'function') {
        cb = times;
        times = 10000;
    }
    
    var t0 = Date.now();
    for (var i = 0; i < times; i++) {
        cb();
    }
    var elapsed = Date.now() - t0;
    
    return elapsed / times;
};

ben.async = function (times, cb, resultCb) {
    if (typeof times === 'function') {
        cb = times;
        times = 100;
    }
    
    var pending = times;
    var t0 = Date.now();
    cb(function fn () {
        if (--pending === 0) {
            var elapsed = Date.now() - t0;
            resultCb(elapsed / times);
        }
        else {
            cb(fn);
        }
    });
};
