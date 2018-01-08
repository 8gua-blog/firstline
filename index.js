'use strict';

var fs = require('fs');

module.exports = function(path) {
    return new Promise(function(resolve, reject) {
        var rs = fs.createReadStream(path, {
            encoding: 'utf8'
        });
        var acc = '',
            r;
        var pos = 0;
        var index;
        rs.on('data', function(chunk) {
            index = chunk.indexOf('\n');
            acc += chunk;
            if (index >= 0) {
                r = acc.slice(0, pos + index).trim()
                if (r.length) {
                    rs.close();
                }
            }
            pos += chunk.length;
        })
            .on('close', function() {
            resolve(r || acc.trim());
        })
            .on('error', function(err) {
            reject(err);
        })
    });
};
