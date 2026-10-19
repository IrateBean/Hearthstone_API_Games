async function randomCard(){

    const output =
        document.getElementById("output");


    try{

        // Load all Hearthstone cards
        const allCards =
            await loadCards();


        // Apply all shared filters
        const filteredCards =
            filterCards(allCards);


        // Make sure there are cards available
        if(filteredCards.length === 0){

            output.innerHTML =
                "<p class='error'>No cards match the selected filters.</p>";

            return;

        }


        // Select a random card
        const card =
            getRandomCard(filteredCards);
			
			addCardToHistory(card);


        // Display the card
        output.innerHTML = `

            <img
                src="${cardImage(card.id)}"
                alt="${card.name}"
                onerror="this.style.display='none'"
            >

            <div class="info">

                <h2>${card.name}</h2>

                <p>
                    <strong>Mana:</strong>
                    ${card.cost ?? "-"}
                </p>

                <p>
                    <strong>Class:</strong>
                    ${card.cardClass ?? "Neutral"}
                </p>

                <p>
                    <strong>Type:</strong>
                    ${card.type}
                </p>

                <p>
                    <strong>Rarity:</strong>
                    ${card.rarity}
                </p>

                <p>
                    <strong>Set:</strong>
                    ${card.set}
                </p>

                <p>
                    ${card.text || ""}
                </p>

            </div>

        `;

    }
    catch(error){

        console.error(error);

        output.innerHTML =
            "<p class='error'>Unable to load cards.</p>";

    }

}

initializeFilters("filterContainer");

/*
 * Draw Card button
 */
document
    .getElementById("drawButton")
    .addEventListener("click", randomCard);
	
document
    .getElementById("downloadHistory")
    .addEventListener(
        "click",
        downloadCardHistory
    );