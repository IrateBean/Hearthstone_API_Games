const CARD_BACK =
    "imgs/Card_back-Default.webp";

let currentPack = [];


/*
 * Opens a new pack using the currently
 * selected filters.
 */
async function openPack(){

    const button =
        document.getElementById("openPack");

    try{

        button.disabled = true;
        button.textContent = "Opening...";


        // Load all Hearthstone cards
        const allCards =
            await loadCards();


        // Apply the shared filters
        const filteredCards =
            filterCards(allCards);


        // Make sure there are cards available
        if(filteredCards.length === 0){

            document.getElementById("packContainer").innerHTML =
                "<p class='error'>No cards match the selected filters.</p>";

            return;

        }


        // Clear the previous pack
currentPack = [];

// Check whether standard pack rules are enabled
const standardRules =
    document.getElementById("standardPackRules").checked;


if(standardRules){

    /*
     * First card is guaranteed Rare or better.
     */

    currentPack.push(
        getStandardPackCard(filteredCards, true)
    );


    /*
     * Generate the remaining four cards.
     */

    for(let i = 1; i < 5; i++){

        currentPack.push(
            getStandardPackCard(filteredCards, false)
        );

    }

}
else{

    /*
     * Existing simulator behavior.
     */

    for(let i = 0; i < 5; i++){

        currentPack.push(
            getRandomCard(filteredCards)
        );

    }

}

		addCardsToHistory(currentPack);

        renderPack();

    }
    catch(error){

        console.error(error);

        document.getElementById("packContainer").innerHTML =
            "<p class='error'>Unable to open pack.</p>";

    }
    finally{

        button.disabled = false;
        button.textContent = "Open Pack";

    }

}


/*
 * Displays the five cards as card backs.
 */
function renderPack(){

    const container =
        document.getElementById("packContainer");

    container.innerHTML = "";


    currentPack.forEach(card => {

        const img =
            document.createElement("img");


        img.src = CARD_BACK;

        img.className = "pack-card";

        img.dataset.revealed = "false";


        img.onclick = () =>
            revealCard(img, card);


        container.appendChild(img);

    });

}


/*
 * Reveals an individual card.
 */
function revealCard(img, card){

    if(img.dataset.revealed === "true"){
        return;
    }


    img.src =
        cardImage(card.id);


    img.dataset.revealed = "true";

}

function getStandardPackCard(cards, guaranteedRare = false){

    let rarity;

    const roll = Math.random();


    if(guaranteedRare){

        /*
         * Guaranteed Rare or better:
         *
         * 94% Rare
         * 5% Epic
         * 1% Legendary
         */

        if(roll < 0.01){

            rarity = "Legendary";

        }
        else if(roll < 0.05){

            rarity = "Epic";

        }
        else{

            rarity = "Rare";

        }

    }
    else{

        /*
         * Normal card slot:
         *
         * 70% Common
         * 23% Rare
         * 6% Epic
         * 1% Legendary
         */

        if(roll < 0.01){

            rarity = "Legendary";

        }
        else if(roll < 0.06){

            rarity = "Epic";

        }
        else if(roll < 0.23){

            rarity = "Rare";

        }
        else{

            rarity = "Common";

        }

    }


    const rarityCards =
        cards.filter(card =>
            card.rarity === rarity
        );


    /*
     * If the selected rarity isn't available
     * in the current card pool, fall back to
     * any available card.
     */

    if(rarityCards.length === 0){

        return getRandomCard(cards);

    }


    return getRandomCard(rarityCards);

}


/*
 * Start the filter system.
 */
initializeFilters("filterContainer");


/*
 * Open Pack button.
 */
document
    .getElementById("openPack")
    .addEventListener("click", openPack);
	
document
    .getElementById("downloadHistory")
    .addEventListener(
        "click",
        downloadCardHistory
    );
	
document
    .getElementById("standardPackRules")
    .addEventListener("change", event => {

        setPackRulesMode(event.target.checked);

    });