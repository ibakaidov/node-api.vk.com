var https = require('https');
var vk, Chain;
module.exports = vk = function (method, options, callback) {

    var req = https.get('https://api.vk.com/method/' + method + '?' + require('querystring').stringify(options), function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var result = JSON.parse(data);
            callback(result.error!=null ? result.error : null, result.response!=null? result.response:null);
        });
    }).on('error', function (e) {
        callback(e);
    });
};
module.exports.Chain = function (limit, chain) {
    this.limit = (limit == null) ? 3 : limit;
    this.chain = (chain == null) ? [] : chain;
    this.push = function (method, options, callback) {
        this.chain.push([method, options, callback]);
    };
    this.worker = function (_this) {
        for (var i = (_this.limit < _this.chain.length) ? _this.limit : _this.chain.length; i > 0; i--) {
            
            var requet = _this.chain.shift();
            vk.apply(_this, requet);
        }
        if (_this.chain.length === 0) {
            _this.timer.unref();
        } else {
            _this.timer.ref();
        }
    };
    this.timer = setInterval(this.worker, 1000, this);
    if (this.chain.length>0){
        this.worker(this);
    }

};