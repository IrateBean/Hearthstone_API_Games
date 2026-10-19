let generatedCardHistory = [];


/*
 * Reset the card history whenever the page loads.
 */
function resetCardHistory(){

    generatedCardHistory = [];

}


/*
 * Add a single card to the history.
 */
function addCardToHistory(card){

    if(!card || !card.name){
        return;
    }

    generatedCardHistory.push(card.name);

}


/*
 * Add multiple cards to the history.
 */
function addCardsToHistory(cards){

    if(!Array.isArray(cards)){
        return;
    }

    cards.forEach(card => {

        addCardToHistory(card);

    });

}


/*
 * Create and download the CSV file.
 */
function downloadCardHistory(){

    if(generatedCardHistory.length === 0){

        alert("No cards have been generated yet.");

        return;

    }


    let csv = "Card Name\n";


    generatedCardHistory.forEach(name => {

        /*
         * Escape quotation marks in card names.
         */
        const escapedName =
            String(name).replace(/"/g, '""');

        csv += `"${escapedName}"\n`;

    });


    const blob =
        new Blob(
            [csv],
            { type:"text/csv;charset=utf-8;" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "hearthstone-card-history.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}