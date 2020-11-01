let dice = [];
let unicode = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
let dieCount = 0;
$('document').ready(() => {
    $('#newDie').click(() => {
        dice.push(new Die());
    });
    $('#rerollDie').click(() => {
        for(die of dice) {
            die.reroll();
        }
    });
    $('#sumDie').click(() => {
            let sum = 0;
            for(die of dice) sum += die.value;
            $('#dice-sum').empty().append(`Dice Sum: ${sum}`);
    })
});
class Die {
    constructor() {
        this.value = this.roll();
        //console.log(this);
    }

    roll() {
        let possibility = Math.floor(Math.random() * 6) + 1;
        $('.flex-dice').append(`<div class='${dieCount}' id='${possibility}'>${unicode[possibility-1]}</div>`);
        this.count = dieCount;
        dieCount++;
        this.dieFlex = $(`.${this.count}`);
        this.dieFlex.click(() => this.reroll());
        this.dieFlex.dblclick(() => this.delete());
        return possibility;
    }

    delete() {
        //dice.splice(this.count, 1);
        /******************************************************
         * I tried removing the object from the array but the way
         * that I wrote this, the index position in the array
         * is important. So I decided to leave it in there and
         * just make it be ignored when the value is set to 0.
         ******************************************************/
        this.value = 0;
        this.dieFlex.remove();
    }

    reroll() {
        if(this.value === 0) return; // deleted die
        let possibility = Math.floor(Math.random() * 6) + 1;
        this.dieFlex.empty();
        this.dieFlex.append(unicode[possibility-1]);
        this.dieFlex.attr('id', possibility);
        this.value = possibility;
    }
    
}