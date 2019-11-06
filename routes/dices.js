var express = require('express');
var router = express.Router();

var Dice = require('../classe/Dice');

router.get('/:numberDice', function(req, res, next) {
    var dices = Array();
    console.log(req.params.numberDice);
    for(var i = 1; i <= req.params.numberDice; i++){
        var dice = new Dice(i);
        dice.roll();
        dices.push(dice);
    }
  res.send(JSON.stringify(dices));
});

module.exports = router;
