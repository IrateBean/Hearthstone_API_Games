const DATA_URL =
    "https://api.hearthstonejson.com/v1/latest/enUS/cards.json";

let cards = [];

/**
 * Loads Hearthstone cards once and caches them.
 */
async function loadCards() {

    if (cards.length) {
        return cards;
    }

    const response = await fetch(DATA_URL);

    if (!response.ok) {
        throw new Error("Failed to load Hearthstone card data.");
    }

    const data = await response.json();

    cards = data.filter(card =>
        card.collectible &&
        card.id &&
        !card.battlegroundsNormalDbfId
    );

    return cards;
}

/**
 * Returns the image URL for a card.
 */
function cardImage(cardId) {
    return `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${cardId}.png`;
}

/**
 * Returns a random card from a list.
 */
function getRandomCard(cardList) {
    return cardList[Math.floor(Math.random() * cardList.length)];
}

/**
 * Returns a sorted list of unique card sets.
 */
function getAvailableSets(cardList) {

    return [
        ...new Set(
            cardList
                .map(card => card.set)
                .filter(set => set)
        )
    ].sort();

}