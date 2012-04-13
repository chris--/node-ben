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
ben.sync = ben;


ben.suiteSync = function(times, cbs) {
    if (typeof times === 'function') {
        cbs = times;
        times = 10;
    }
    
    var results = []; //array for results
    
    cbs.forEach(function(cb){
        var testtime = ben.sync(times, cb);
        results.push({
            "functionname": cb.name,
            "runs": (times),
            "ms": (testtime)
        });
    });
    
    return results;
};


ben.async = function (times, cb, resultCb) {
    if (typeof times === 'function') {
        resultCb = cb;
        cb = times;
        times = 100;
    }
    
    var pending = times;
    var t = Date.now();
    var elapsed = 0;
    
    cb(function fn () {
        elapsed += Date.now() - t;
        
        if (--pending === 0) {
            resultCb(elapsed / times);
        }
        else {
            t = Date.now();
            cb(fn);
        }
    });
};


ben.suiteAsync = function(times, cbs, resultCb, async) { // if async is true, execute all cbs at once
    if (typeof times === 'function') {
        resultCb = cb;
        cbs = times;
        times = 100;
    }
    
    var results = []; //array for results

    if(!async) {
        var executeTestsInOrder = function(ms) {
            results.push({
                "functionname": cbs[0].name,
                "runs": times,
                "ms": ms
            });

            cbs.shift();
            if (cbs[0]) {
                ben.async(times,cbs[0],executeTestsInOrder);
            } else {
                resultCb(results);
            };
        };
        ben.async(times,cbs[0],executeTestsInOrder);

    } else {
        cbs.forEach(function(cb) {
            var pending = times; //jede testFn times mal ausfuehren
            var t = Date.now(); //derzeitiges Datum speichern
            var elapsed = 0; //anzahl der abgeschlossenen Tests
            cb(function fn() { //die einzelnen cbs (tests) aufrufen
                elapsed += Date.now() - t;
                if (--pending === 0) {
                  results.push({
                    "functionname": cb.name,
                    "runs": (times - pending),
                    "ms": (elapsed / times)
                  });
                  if (results.length === cbs.length) {
                    resultCb(results);
                  }
                } else {
                  t = Date.now();
                  cb(fn);
                }
              });
        });
        }
};
