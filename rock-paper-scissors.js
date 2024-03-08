console.log(`Rock, Paper, Scissors Connected`);

let wins = 0;
let draws = 0;
let losses = 0;
let computerWins = 0;
let computerLosses = 0;

let gameMessage = `Choose a button to play`;
const updateGameMessage = () => $(`.gameMessage`).each(function() { $(this).html(gameMessage) });

let choices = {
    rock: `Rock`,
    paper: `Paper`,
    scissors: `Scissors`,
}

let gameOverConditions = {
    lose: `Lose`,
    draw: `Draw`,
    win: `Win`,
}

let options = {
    [choices.rock]: {
        name: choices.rock,
        beats: choices.scissors,
    },
    [choices.paper]: {
        name: choices.paper,
        beats: choices.rock,
    },
    [choices.scissors]: {
        name: choices.scissors,
        beats: choices.paper,
    },
}

const removeGameClasses = (jqeuryElem) => {
    if (jqeuryElem.hasClass(`active`)) jqeuryElem.toggleClass(`active`);
    if (jqeuryElem.hasClass(gameOverConditions.win)) jqeuryElem.toggleClass(gameOverConditions.win);
    if (jqeuryElem.hasClass(gameOverConditions.draw)) jqeuryElem.toggleClass(gameOverConditions.draw);
    if (jqeuryElem.hasClass(gameOverConditions.lose)) jqeuryElem.toggleClass(gameOverConditions.lose);
}

const updateGameStats = () => {
    $(`.wins`).each(function() { $(this).html(wins); });
    $(`.draws`).each(function() { $(this).html(draws); });
    $(`.losses`).each(function() { $(this).html(losses); });
    $(`.computerWins`).each(function() { $(this).html(computerWins); });
    $(`.computerLosses`).each(function() { $(this).html(computerLosses); });
}

const updateComputerChoices = (choiceMatch, gameOverCondition) => {
    $(`.computerChoice`).each(function() {
        let classToToggle;
        if (choiceMatch && gameOverCondition) {
            if ($(this).text().trim() === choiceMatch) {
                $(this).toggleClass(`active`);
                if (gameOverCondition == gameOverConditions.lose) {
                    classToToggle = gameOverConditions?.win;
                    computerWins = computerWins + 1;
                } else if (gameOverCondition == gameOverConditions.win) {
                    classToToggle = gameOverConditions?.lose;
                    computerLosses = computerLosses + 1;
                } else if (gameOverCondition == gameOverConditions.draw) {
                    classToToggle = gameOverConditions?.draw;
                }

                $(this).toggleClass(classToToggle);
            } else {
                removeGameClasses($(this));
            }
        } else {
            removeGameClasses($(this));
        }
    });
};

const selectChoice = (e) => {
    let gameOverCondition;
    let choiceValues = Object.values(choices);
    let randomIndex = Math.floor(Math.random() * choiceValues.length);
    let computerChoice = choiceValues[randomIndex];
    let choice = e?.target?.textContent.trim();

    $(`.choiceButton`).each(function() {
        removeGameClasses($(this));
    })

    gameMessage = `You chose ${choice}, Computer chose ${computerChoice}`;

    if (choice == computerChoice) {
        gameMessage = `It's A Draw! --- ` + gameMessage + ` --- It's A Draw!`;
        gameOverCondition = gameOverConditions.draw;
        draws = draws + 1;
    } else if (options[choice].beats == computerChoice) {
        gameMessage = `You Win! --- ` + gameMessage + ` --- You Win!`;
        gameOverCondition = gameOverConditions.win;
        wins = wins + 1;
    } else {
        gameMessage = `You Lose! --- ` + gameMessage + ` --- You Lose!`;
        gameOverCondition = gameOverConditions.lose;
        losses = losses + 1;
    }

    if (!e?.target?.classList?.contains(`active`)) e?.target?.classList?.add(`active`);
    if (!e?.target?.classList?.contains(gameOverCondition)) e?.target?.classList?.add(gameOverCondition);

    updateComputerChoices(computerChoice, gameOverCondition);
    updateGameMessage();
    updateGameStats();
}

updateGameMessage();