class Dice {
    constructor(num = 1) {
      this.name = "dice "+num;
      this.val = null;
    }
    setNum(num){
      this.name = "dice "+num;
    }
    getNum() {
      return this.name;
    }

    roll(){
        this.val = Math.floor(Math.random() * 6) + 1;
    }
}

module.exports = Dice;