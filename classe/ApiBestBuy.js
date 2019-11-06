let http = require('follow-redirects').http;
var ApiBestBuy = function() {
    this.constructor = function() {
         
    };

    this.getProduct = function(sku){
        var options = {
          hostname:'bestbuy.ca',
          path: '/api/v2/JSON/product/'+sku,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17',
            'Referer': 'http://localhost/',
          }
        };
      
      
          return new Promise(function (resolve, reject){
            http.get(options, (res) => {
          const { statusCode } = res;
          const contentType = res.headers['content-type'];
      
          let error;
          if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                              `Status Code: ${statusCode}`);
          } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                              `Expected application/json but received ${contentType}`);
          }
          if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            reject(error.message);
            return;
          }
      
          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              resolve(parsedData);
            } catch (e) {
                reject(e.message);
            }
          });
        }).on('error', (e) => {
            reject(`Got error: ${e.message}`);
        });
      });
    };
};

module.exports = ApiBestBuy;