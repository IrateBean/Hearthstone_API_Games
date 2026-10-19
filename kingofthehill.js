let availableCards = [];

let filteredCardList = [];

let leftCard = null;
let rightCard = null;


/*
 * Start or restart King of the Hill.
 */
async function startKingOfTheHill(){

    const button =
        document.getElementById("startButton");

    const downloadButton =
        document.getElementById("downloadKingList");

    const container =
        document.getElementById("kingContainer");

    const status =
        document.getElementById("kingStatus");


    try{

        button.disabled = true;
        button.textContent = "Loading...";

        container.innerHTML = "";
        status.textContent = "";


        /*
         * Load all Hearthstone cards.
         */
        const allCards =
            await loadCards();


        /*
         * Apply the currently selected filters.
         */
        const matchingCards =
            filterCards(allCards);


        /*
         * Remove duplicate card IDs.
         *
         * This creates the master list of cards
         * that will be used for the competition.
         */
        filteredCardList =
			matchingCards.filter(
				(card, index, array) =>
					index ===
					array.findIndex(
						otherCard =>
							otherCard.name === card.name
					)
			);


        /*
         * Make sure at least two cards
         * are available.
         */
        if(filteredCardList.length < 2){

            availableCards = [];

            downloadButton.disabled = true;

            status.textContent =
                "You need at least two cards matching the selected filters.";

            return;

        }


        /*
         * Create a fresh copy of the filtered list.
         *
         * filteredCardList remains untouched so it
         * can be downloaded as the complete list.
         */
        availableCards =
            [...filteredCardList];


        /*
         * Enable the CSV download.
         */
        downloadButton.disabled = false;


        /*
         * Reset the current competition.
         */
        leftCard = null;
        rightCard = null;


        /*
         * Pick the first two cards.
         *
         * drawAndRemoveCard() removes each card
         * from availableCards immediately.
         */
        leftCard =
            drawAndRemoveCard();

        rightCard =
            drawAndRemoveCard();


        renderCards();

        updateStatus();

    }
    catch(error){

        console.error(error);

        container.innerHTML =
            "<p class='error'>Unable to start King of the Hill.</p>";

    }
    finally{

        button.disabled = false;
        button.textContent = "Start";

    }

}


/*
 * Select a random card from the available pool
 * and remove it immediately.
 */
function drawAndRemoveCard(){

    if(availableCards.length === 0){
        return null;
    }


    const index =
        Math.floor(
            Math.random() * availableCards.length
        );


    const card =
        availableCards[index];


    /*
     * Remove the selected card from the pool.
     */
    availableCards.splice(index, 1);


    return card;

}


/*
 * Display the current left and right.
 */
function renderCards(){

    const container =
        document.getElementById("kingContainer");

    container.innerHTML = "";


    /*
     * LEFT CARD
     */
    if(leftCard){

        const leftCardElement =
            createCardElement(
                leftCard,
                "left-card"
            );

        container.appendChild(leftCardElement);

    }


    /*
     * RIGHT CARD
     */
    if(rightCard){

        const rightCardElement =
            createCardElement(
                rightCard,
                "right-card"
            );

        container.appendChild(rightCardElement);

    }

}


/*
 * Create a clickable Hearthstone card.
 */
function createCardElement(card, position){

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "king-card " + position;


    const img =
        document.createElement("img");

    img.src =
        cardImage(card.id);

    img.alt =
        card.name;

    img.className =
        "king-card-image";


    img.onclick = () => {

        if(position === "left-card"){

            selectLeftCard();

        }
        else{

            selectRightCard();

        }

    };


    wrapper.appendChild(img);


    const name =
        document.createElement("h2");

    name.textContent =
        card.name;

    wrapper.appendChild(name);


    return wrapper;

}


/*
 * Left was clicked.
 *
 * Left stays.
 * Right is replaced.
 */
function selectLeftCard(){

    if(!leftCard){
        return;
    }


    /*
     * Left card stays exactly where it is.
     *
     * Replace the right card.
     */
    if(availableCards.length === 0){

        rightCard = null;

        renderCards();

        document.getElementById("kingStatus").textContent =
            `${leftCard.name} is the King of the Hill!`;

        return;

    }


    rightCard =
        drawAndRemoveCard();


    renderCards();

    updateStatus();

}


/*
 * Right was clicked.
 *
 * Right stays.
 * Left is replaced.
 */
function selectRightCard(){

    if(!rightCard){
        return;
    }


    /*
     * Right card stays exactly where it is.
     *
     * Replace the left card.
     */
    if(availableCards.length === 0){

        leftCard = null;

        renderCards();

        document.getElementById("kingStatus").textContent =
            `${rightCard.name} is the King of the Hill!`;

        return;

    }


    leftCard =
        drawAndRemoveCard();


    renderCards();

    updateStatus();

}


/*
 * Update the number of cards remaining.
 */
function updateStatus(){

    const status =
        document.getElementById("kingStatus");


    status.textContent =
        `${availableCards.length} cards remaining`;

}


/*
 * Download the complete list of cards
 * that matched the filters when Start
 * was pressed.
 */
function downloadKingList(){

    if(filteredCardList.length === 0){
        return;
    }


    const headers = [
        "Name",
        "ID",
        "Mana",
        "Class",
        "Type",
        "Rarity",
        "Set",
        "Power",
        "Health"
    ];


    const rows =
        filteredCardList.map(card => [

            card.name ?? "",

            card.id ?? "",

            card.cost ?? "",

            card.cardClass ?? "Neutral",

            card.type ?? "",

            card.rarity ?? "",

            card.set ?? "",

            card.attack ?? "",

            card.health ?? ""

        ]);


    /*
     * Escape CSV values correctly.
     */
    const csvEscape = value => {

        const stringValue =
            String(value);

        return `"${stringValue.replace(
            /"/g,
            '""'
        )}"`;

    };


    const csv = [

        headers.map(csvEscape).join(","),

        ...rows.map(row =>
            row.map(csvEscape).join(",")
        )

    ].join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:"text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "king-of-the-hill-card-list.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/*
 * Start the filter system.
 */
initializeFilters("filterContainer");


/*
 * Start button.
 */
document
    .getElementById("startButton")
    .addEventListener(
        "click",
        startKingOfTheHill
    );


/*
 * CSV download button.
 */
document
    .getElementById("downloadKingList")
    .addEventListener(
        "click",
        downloadKingList
    );