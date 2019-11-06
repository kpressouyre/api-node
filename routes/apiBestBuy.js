var express = require('express');
var router = express.Router();

var ApiBestBuy = require('../classe/ApiBestBuy');

router.get('/:skuProduct', function(req, res, next) {
    var skuProduct = req.params.skuProduct;
    var api = new ApiBestBuy();

    api.getProduct(skuProduct).then(results => {
        res.send(results);
    }).catch(error => {
        res.send(error);
    });
});
module.exports = router;
