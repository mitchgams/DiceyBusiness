/**************************
 * I went ahead and went with unicode instead of numbers. I also
 * added some flavor to the dice being rolled
 */

let dice = [];
let unicode = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
$('document').ready(() => {
    $('#newDie').click(() => dice.push(new Die()));
    $('#rerollDie').click(() => {
        for(die of dice) die.roll();
    });
    $('#sumDie').click(() => {
            let sum = 0;
            for(die of dice) sum += die.value;
            $('#dice-sum').empty().append(`Dice Sum: ${sum}`);
    })
});
class Die {
    constructor() {
        this.dieBoard = $('.flex-dice');
        this.roll();
    }

    dieValue() {
        return Math.floor(Math.random() * 6) + 1;
    }

    roll() {
        this.value = this.dieValue();
        if(this.newItem === undefined) {
            this.newItem = $('<div></div>');
            this.dieBoard.append(this.newItem);
        }
        let rollDie = setInterval(() => {
            this.newItem.empty().append(unicode[this.dieValue()-1]);
        }, 275);
        setTimeout(() => {
            clearInterval(rollDie);
            this.newItem.empty().append(unicode[this.value-1]);
            this.newItem.click(() => this.roll());
            this.newItem.dblclick(() => this.delete());
        }, 1650)
    }

    delete() {
        if(dice.indexOf(this) > -1) dice.splice(dice.indexOf(this), 1);
        this.newItem.remove();
    }
}