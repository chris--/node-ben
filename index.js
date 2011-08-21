var bent = module.exports = function (times, cb) {
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
