var ben = require('ben');

var test1 = function (done) {
    setTimeout(done, 10);
};

var test2 = function (done) {
    setTimeout(done, 15);
};

ben.suiteAsync(2, [test1, test2], function(results) {
  console.log(results);
});