let dice = [];
let unicode = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
let dieCount = 0;
$('document').ready(() => {
    $('#newDie').click(() => dice.push(new Die()));
    $('#rerollDie').click(() => {
        for(die of dice) die.reroll();
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
    }
    
    roll() {
        let possibility = Math.floor(Math.random() * 6) + 1;
        this.newItem = $(`<div>${unicode[possibility-1]}</div>`);
        $('.flex-dice').append(this.newItem);
        this.newItem.click(() => this.reroll());
        this.newItem.dblclick(() => this.delete());
        return possibility;
    }

    delete() {
        dice.splice(dice.indexOf(this), 1);
        this.newItem.remove();
    }

    reroll() {
        this.value = Math.floor(Math.random() * 6) + 1;
        this.newItem.empty().append(unicode[this.value-1]);
    }
    
}