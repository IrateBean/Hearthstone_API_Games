let allCards = [];

let cardOne = null;
let cardTwo = null;

let currentQuestion = null;

let score = 0;

let gameOver = false;


/*
 * The three possible questions.
 */

const QUESTIONS = [
    {
        text: "Which has the higher mana cost?",
        stat: "mana"
    },
    {
        text: "Which has the higher attack?",
        stat: "attack"
    },
    {
        text: "Which has the higher health?",
        stat: "health"
    }
];


/*
 * Start the game.
 */

async function startGame(){

    try{

        score = 0;
        gameOver = false;

        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

        document.getElementById("score").textContent =
            "Score: 0";

        document.getElementById("result").innerHTML = "";

        document.getElementById("continueButton").style.display =
            "none";


        /*
         * Load the Hearthstone card database.
         */

        allCards = await loadCards();


        /*
         * Start the first round.
         */

        generateRound();

    }
    catch(error){

        console.error(error);

        document.getElementById("result").innerHTML =
            "<p class='error'>Unable to load cards.</p>";

    }

}


/*
 * Generate a new round.
 */

function generateRound(){

    /*
     * Reset the result area.
     */

    document.getElementById("result").innerHTML = "";

    document.getElementById("continueButton").style.display =
        "none";


    /*
     * Pick one of the three questions.
     */

    currentQuestion =
        QUESTIONS[
            Math.floor(Math.random() * QUESTIONS.length)
        ];


    document.getElementById("question").textContent =
        currentQuestion.text;


    /*
     * Get cards that are valid for
     * the selected question.
     */

    const eligibleCards =
        getEligibleCards(currentQuestion.stat);


    /*
     * Keep generating the round until
     * the two cards have different values.
     */

    do{

        cardOne =
            eligibleCards[
                Math.floor(Math.random() * eligibleCards.length)
            ];

        cardTwo =
            eligibleCards[
                Math.floor(Math.random() * eligibleCards.length)
            ];

    }
    while(
        cardOne.id === cardTwo.id ||
        getCardValue(cardOne, currentQuestion.stat) ===
        getCardValue(cardTwo, currentQuestion.stat)
    );


    /*
     * Display only the names before
     * the player makes their choice.
     */

    displayChoices();

}


/*
 * Determine which cards can be used
 * for the current question.
 */

function getEligibleCards(stat){

    if(stat === "mana"){

        /*
         * Every card with a valid mana cost.
         */

        return allCards.filter(card =>
            typeof card.cost === "number"
        );

    }


    if(stat === "attack"){

        /*
         * Only Minions and Weapons
         * can have attack.
         */

        return allCards.filter(card =>
            (
                card.type === "MINION" ||
                card.type === "WEAPON"
            ) &&
            typeof card.attack === "number"
        );

    }


    if(stat === "health"){

        /*
         * Only Minions have health.
         */

        return allCards.filter(card =>
            card.type === "MINION" &&
            typeof card.health === "number"
        );

    }


    return [];

}


/*
 * Get the value being compared.
 */

function getCardValue(card, stat){

    if(stat === "mana"){
        return card.cost;
    }

    if(stat === "attack"){
        return card.attack;
    }

    if(stat === "health"){
        return card.health;
    }

    return null;

}


/*
 * Display the two card names.
 */

function displayChoices(){

    const buttonOne =
        document.getElementById("cardOne");

    const buttonTwo =
        document.getElementById("cardTwo");


    /*
     * Reset the buttons.
     */

    buttonOne.innerHTML = "";
    buttonTwo.innerHTML = "";

    buttonOne.disabled = false;
    buttonTwo.disabled = false;


    /*
     * Add the card names.
     */

    buttonOne.textContent =
        cardOne.name;

    buttonTwo.textContent =
        cardTwo.name;


    /*
     * Set up their click events.
     */

    buttonOne.onclick = () =>
        selectCard(cardOne, cardTwo, buttonOne, buttonTwo);


    buttonTwo.onclick = () =>
        selectCard(cardTwo, cardOne, buttonTwo, buttonOne);

}


/*
 * Handle the player's choice.
 */

function selectCard(
    selectedCard,
    otherCard,
    selectedButton,
    otherButton
){

    /*
     * Prevent the player from clicking
     * multiple times.
     */

    document.getElementById("cardOne").disabled = true;
    document.getElementById("cardTwo").disabled = true;


    const selectedValue =
        getCardValue(
            selectedCard,
            currentQuestion.stat
        );


    const otherValue =
        getCardValue(
            otherCard,
            currentQuestion.stat
        );


    /*
     * Determine whether the player
     * selected the higher card.
     */

    const correct =
        selectedValue > otherValue;


    /*
     * Show both cards and their values.
     */

    showResults();


    if(correct){

        score++;

        document.getElementById("score").textContent =
            `Score: ${score}`;


        document.getElementById("result").innerHTML =
            "<p class='correct'>✓ Correct!</p>";


        document.getElementById("continueButton").style.display =
            "inline-block";

    }
    else{

        gameOver = true;

        document.getElementById("result").innerHTML =
            "<p class='error'>✗ Wrong!</p>";


        document.getElementById("finalScore").textContent =
            `Final Score: ${score}`;


        document.getElementById("gameOverScreen").style.display =
            "block";

    }

}


/*
 * Replace the card names with their
 * actual card images and values.
 */

function showResults(){

    const buttonOne =
        document.getElementById("cardOne");

    const buttonTwo =
        document.getElementById("cardTwo");


    buttonOne.innerHTML = `
        <img
            src="${cardImage(cardOne.id)}"
            alt="${cardOne.name}">
        <strong>${cardOne.name}</strong>
        <span>
            ${getCardValue(cardOne, currentQuestion.stat)}
        </span>
    `;


    buttonTwo.innerHTML = `
        <img
            src="${cardImage(cardTwo.id)}"
            alt="${cardTwo.name}">
        <strong>${cardTwo.name}</strong>
        <span>
            ${getCardValue(cardTwo, currentQuestion.stat)}
        </span>
    `;

}


/*
 * Continue after a correct answer.
 */

document
    .getElementById("continueButton")
    .addEventListener("click", () => {

        generateRound();

    });


/*
 * Start button.
 */

document
    .getElementById("startButton")
    .addEventListener("click", startGame);


/*
 * Restart button.
 */

document
    .getElementById("restartButton")
    .addEventListener("click", () => {

        document.getElementById("gameOverScreen").style.display =
            "none";

        startGame();

    });