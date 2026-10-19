let availableSets = [];

let selectedRarities = [];
let selectedSets = [];
let selectedManaCosts = [];
let selectedPowers = [];
let selectedHealths = [];
let selectedCardTypes = [];
let selectedAbilities = [];
let selectedCardClasses = [];


/*
 * List of abilities available for filtering.
 */
const abilities = [
    "Battlecry",
    "Deathrattle",
    "Rush",
    "Taunt",
    "Divine Shield",
    "Lifesteal",
    "Windfury",
    "Charge",
    "Stealth",
    "Discover",
    "Reborn",
    "Poisonous",
    "Freeze",
    "Secret",
    "Magnetic",
    "Overload",
    "Echo",
    "Spell Damage",
    "Adapt",
    "Combo",
    "Enrage",
    "Inspire",
    "Silence",
    "Immune",
    "Choose One",
    "Outcast",
    "Corrupt",
    "Tradeable",
    "Infuse",
    "Forge",
    "Manathirst",
    "Excavate",
    "Quickdraw",
    "Miniaturize",
    "Titan",
    "Frenzy",
    "Colossal",
    "Dormant",
    "Honorable Kill",
    "Finale"
];


/*
 * Initializes all shared filters.
 */
async function initializeFilters(containerId){

    const container =
        document.getElementById(containerId);

    if(!container){

        console.error(
            `Filter container '${containerId}' was not found.`
        );

        return;

    }

    const allCards =
        await loadCards();

    availableSets =
        getAvailableSets(allCards);

    createRarityFilter(container);

    createManaFilter(container);

    createPowerFilter(container);

    createHealthFilter(container);

    createCardTypeFilter(container);

    createCardClassFilter(container);

    createAbilityFilter(container);

    createSetFilter(container);

    createSelectedFilters(container);

}


/*
 * Creates the Rarity filter.
 */
function createRarityFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className = "filter-group filter-rarity";


    const label =
        document.createElement("label");

    label.textContent = "Rarity";


    const options =
        document.createElement("div");

    options.className = "filter-options";


    const rarities = [
        "FREE",
        "COMMON",
        "RARE",
        "EPIC",
        "LEGENDARY"
    ];


    rarities.forEach(rarity => {

        const option =
            document.createElement("button");

        option.type = "button";

        option.className = "filter-option";

        option.textContent =
            rarity.charAt(0) +
            rarity.slice(1).toLowerCase();


        option.addEventListener("click", () => {

            toggleRarity(rarity);

        });


        options.appendChild(option);

    });


    wrapper.appendChild(label);

    wrapper.appendChild(options);

    container.appendChild(wrapper);

}


/*
 * Creates the Mana Cost filter.
 */
function createManaFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className = "filter-group filter-mana";


    const label =
        document.createElement("label");

    label.textContent = "Mana Cost";


    const options =
        document.createElement("div");

    options.className = "filter-options";


    const manaCosts = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ];


    manaCosts.forEach(mana => {

        const option =
            document.createElement("button");

        option.type = "button";

        option.className = "filter-option";

        option.textContent =
            mana === 10
                ? "10+"
                : mana;


        option.addEventListener("click", () => {

            toggleManaCost(mana);

        });


        options.appendChild(option);

    });


    wrapper.appendChild(label);

    wrapper.appendChild(options);

    container.appendChild(wrapper);

}


/*
 * Creates the Power filter.
 */
function createPowerFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className = "filter-group filter-power";


    const label =
        document.createElement("label");

    label.textContent = "Power";


    const options =
        document.createElement("div");

    options.className = "filter-options";


    const powers = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ];


    powers.forEach(power => {

        const option =
            document.createElement("button");

        option.type = "button";

        option.className = "filter-option";

        option.textContent =
            power === 10
                ? "10+"
                : power;


        option.addEventListener("click", () => {

            togglePower(power);

        });


        options.appendChild(option);

    });


    wrapper.appendChild(label);

    wrapper.appendChild(options);

    container.appendChild(wrapper);

}


/*
 * Creates the Health filter.
 */
function createHealthFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className = "filter-group filter-health";


    const label =
        document.createElement("label");

    label.textContent = "Health";


    const options =
        document.createElement("div");

    options.className = "filter-options";


    const healthValues = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ];


    healthValues.forEach(health => {

        const option =
            document.createElement("button");

        option.type = "button";

        option.className = "filter-option";

        option.textContent =
            health === 10
                ? "10+"
                : health;


        option.addEventListener("click", () => {

            toggleHealth(health);

        });


        options.appendChild(option);

    });


    wrapper.appendChild(label);

    wrapper.appendChild(options);

    container.appendChild(wrapper);

}


/*
 * Creates the Card Type filter.
 */
function createCardTypeFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className = "filter-group filter-type";


    const label =
        document.createElement("label");

    label.textContent = "Card Type";


    const options =
        document.createElement("div");

    options.className = "filter-options";


    const cardTypes = [
        "MINION",
        "SPELL",
        "WEAPON",
        "LOCATION",
        "HERO"
    ];


    cardTypes.forEach(type => {

        const option =
            document.createElement("button");

        option.type = "button";

        option.className = "filter-option";

        option.textContent =
            type.charAt(0) +
            type.slice(1).toLowerCase();


        option.addEventListener("click", () => {

            toggleCardType(type);

        });


        options.appendChild(option);

    });


    wrapper.appendChild(label);

    wrapper.appendChild(options);

    container.appendChild(wrapper);

}


/*
 * Creates the Card Class filter.
 */
function createCardClassFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className = "filter-group filter-class";


    const label =
        document.createElement("label");

    label.textContent = "Class";


    const options =
        document.createElement("div");

    options.className = "filter-options";


    const cardClasses = [
        {
            value: "DEATHKNIGHT",
            name: "Death Knight"
        },
        {
            value: "DEMONHUNTER",
            name: "Demon Hunter"
        },
        {
            value: "DRUID",
            name: "Druid"
        },
        {
            value: "HUNTER",
            name: "Hunter"
        },
        {
            value: "MAGE",
            name: "Mage"
        },
        {
            value: "PALADIN",
            name: "Paladin"
        },
        {
            value: "PRIEST",
            name: "Priest"
        },
        {
            value: "ROGUE",
            name: "Rogue"
        },
        {
            value: "SHAMAN",
            name: "Shaman"
        },
        {
            value: "WARLOCK",
            name: "Warlock"
        },
        {
            value: "WARRIOR",
            name: "Warrior"
        },
        {
            value: "NEUTRAL",
            name: "Neutral"
        }
    ];


    cardClasses.forEach(cardClass => {

        const option =
            document.createElement("button");

        option.type = "button";

        option.className = "filter-option";

        option.textContent =
            cardClass.name;


        option.addEventListener("click", () => {

            toggleCardClass(cardClass.value);

        });


        options.appendChild(option);

    });


    wrapper.appendChild(label);

    wrapper.appendChild(options);

    container.appendChild(wrapper);

}


/*
 * Creates the searchable Abilities filter.
 */
function createAbilityFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "filter-group set-selector filter-ability";


    const label =
        document.createElement("label");

    label.textContent = "Abilities";


    const input =
        document.createElement("input");

    input.type = "text";

    input.id = "abilityFilter";

    input.placeholder = "Search abilities...";

    input.autocomplete = "off";


    const dropdown =
        document.createElement("div");

    dropdown.id = "abilityDropdown";

    dropdown.className = "set-dropdown";


    input.addEventListener("input", () => {

        updateAbilityDropdown(
            input.value,
            dropdown
        );

    });


    wrapper.appendChild(label);

    wrapper.appendChild(input);

    wrapper.appendChild(dropdown);

    container.appendChild(wrapper);

}


/*
 * Creates the searchable Set filter.
 */
function createSetFilter(container){

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "filter-group set-selector filter-set";


    const label =
        document.createElement("label");

    label.textContent = "Card Set";


    const input =
        document.createElement("input");

    input.type = "text";

    input.id = "setFilter";

    input.placeholder = "Search sets...";

    input.autocomplete = "off";


    const dropdown =
        document.createElement("div");

    dropdown.id = "setDropdown";

    dropdown.className = "set-dropdown";


    input.addEventListener("input", () => {

        updateSetDropdown(
            input.value,
            dropdown
        );

    });


    wrapper.appendChild(label);

    wrapper.appendChild(input);

    wrapper.appendChild(dropdown);

    container.appendChild(wrapper);

}


/*
 * Creates the area that displays selected filters.
 */
function createSelectedFilters(container){

    const wrapper =
        document.createElement("div");

    wrapper.id = "selectedFilters";

    wrapper.className = "selected-filters";


    const label =
        document.createElement("label");

    label.textContent = "Selected Filters";


    const selections =
        document.createElement("div");

    selections.id = "selectedFilterList";

    selections.className = "selected-filter-list";


    wrapper.appendChild(label);

    wrapper.appendChild(selections);

    container.appendChild(wrapper);

}


/*
 * Adds or removes a Rarity filter.
 */
function toggleRarity(rarity){

    const index =
        selectedRarities.indexOf(rarity);


    if(index === -1){

        selectedRarities.push(rarity);

    }
    else{

        selectedRarities.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Adds or removes a Mana Cost filter.
 */
function toggleManaCost(mana){

    const index =
        selectedManaCosts.indexOf(mana);


    if(index === -1){

        selectedManaCosts.push(mana);

    }
    else{

        selectedManaCosts.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Adds or removes a Power filter.
 */
function togglePower(power){

    const index =
        selectedPowers.indexOf(power);


    if(index === -1){

        selectedPowers.push(power);

    }
    else{

        selectedPowers.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Adds or removes a Health filter.
 */
function toggleHealth(health){

    const index =
        selectedHealths.indexOf(health);


    if(index === -1){

        selectedHealths.push(health);

    }
    else{

        selectedHealths.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Adds or removes a Card Type filter.
 */
function toggleCardType(type){

    const index =
        selectedCardTypes.indexOf(type);


    if(index === -1){

        selectedCardTypes.push(type);

    }
    else{

        selectedCardTypes.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Adds or removes a Card Class filter.
 */
function toggleCardClass(cardClass){

    const index =
        selectedCardClasses.indexOf(cardClass);


    if(index === -1){

        selectedCardClasses.push(cardClass);

    }
    else{

        selectedCardClasses.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Adds or removes an Ability filter.
 */
function toggleAbility(ability){

    const index =
        selectedAbilities.indexOf(ability);


    if(index === -1){

        selectedAbilities.push(ability);

    }
    else{

        selectedAbilities.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Adds or removes a Set filter.
 */
function toggleSet(set){

    const index =
        selectedSets.indexOf(set);


    if(index === -1){

        selectedSets.push(set);

    }
    else{

        selectedSets.splice(index, 1);

    }


    updateSelectedFilters();

}


/*
 * Maps each filter type to its toggle function.
 */
const filterToggleFunctions = {

    rarity: toggleRarity,

    mana: toggleManaCost,

    power: togglePower,

    health: toggleHealth,

    type: toggleCardType,

    class: toggleCardClass,

    ability: toggleAbility,

    set: toggleSet

};


/*
 * Updates the Ability suggestions as the user types.
 */
function updateAbilityDropdown(search, dropdown){

    dropdown.innerHTML = "";


    if(search.length === 0){

        return;

    }


    const filteredAbilities =
        abilities.filter(ability =>
            ability.toLowerCase()
                .includes(search.toLowerCase())
        );


    filteredAbilities.forEach(ability => {

        const option =
            document.createElement("div");

        option.className = "set-option";

        option.textContent = ability;


        if(selectedAbilities.includes(ability)){

            option.classList.add("selected");

        }


        option.addEventListener("click", () => {

            toggleAbility(ability);


            const input =
                document.getElementById("abilityFilter");

            input.value = "";

            dropdown.innerHTML = "";

        });


        dropdown.appendChild(option);

    });

}


/*
 * Updates the Set suggestions as the user types.
 */
function updateSetDropdown(search, dropdown){

    dropdown.innerHTML = "";


    if(search.length === 0){

        return;

    }


    const filteredSets =
        availableSets.filter(set =>
            set.toLowerCase()
                .includes(search.toLowerCase())
        );


    filteredSets.forEach(set => {

        const option =
            document.createElement("div");

        option.className = "set-option";

        option.textContent = set;


        if(selectedSets.includes(set)){

            option.classList.add("selected");

        }


        option.addEventListener("click", () => {

            toggleSet(set);


            const input =
                document.getElementById("setFilter");

            input.value = "";

            dropdown.innerHTML = "";

        });


        dropdown.appendChild(option);

    });

}


/*
 * Updates the list of selected filter chips.
 */
function updateSelectedFilters(){

    const container =
        document.getElementById("selectedFilterList");


    if(!container){

        return;

    }


    container.innerHTML = "";


    /*
     * Selected Rarities
     */
    selectedRarities.forEach(rarity => {

        createFilterChip(
            container,
            rarity.charAt(0) +
            rarity.slice(1).toLowerCase(),
            "rarity",
            rarity
        );

    });


    /*
     * Selected Mana Costs
     */
    selectedManaCosts.forEach(mana => {

        createFilterChip(
            container,
            mana === 10 ? "10+" : mana,
            "mana",
            mana
        );

    });


    /*
     * Selected Power
     */
    selectedPowers.forEach(power => {

        createFilterChip(
            container,
            power === 10 ? "10+" : power,
            "power",
            power
        );

    });


    /*
     * Selected Health
     */
    selectedHealths.forEach(health => {

        createFilterChip(
            container,
            health === 10 ? "10+" : health,
            "health",
            health
        );

    });


    /*
     * Selected Card Types
     */
    selectedCardTypes.forEach(type => {

        createFilterChip(
            container,
            type.charAt(0) +
            type.slice(1).toLowerCase(),
            "type",
            type
        );

    });


    /*
     * Selected Card Classes
     */
    const classNames = {

        "DEATHKNIGHT": "Death Knight",

        "DEMONHUNTER": "Demon Hunter",

        "DRUID": "Druid",

        "HUNTER": "Hunter",

        "MAGE": "Mage",

        "PALADIN": "Paladin",

        "PRIEST": "Priest",

        "ROGUE": "Rogue",

        "SHAMAN": "Shaman",

        "WARLOCK": "Warlock",

        "WARRIOR": "Warrior",

        "NEUTRAL": "Neutral"

    };


    selectedCardClasses.forEach(cardClass => {

        createFilterChip(
            container,
            classNames[cardClass],
            "class",
            cardClass
        );

    });


    /*
     * Selected Abilities
     */
    selectedAbilities.forEach(ability => {

        createFilterChip(
            container,
            ability,
            "ability",
            ability
        );

    });


    /*
     * Selected Sets
     */
    selectedSets.forEach(set => {

        createFilterChip(
            container,
            set,
            "set",
            set
        );

    });

}


/*
 * Creates an individual selected-filter chip.
 *
 * This single function is shared by every
 * filter category.
 */
function createFilterChip(
    container,
    value,
    type,
    actualValue = value
){

    const chip =
        document.createElement("button");

    chip.type = "button";

    chip.className =
        `filter-chip filter-chip-${type}`;

    chip.textContent =
        `${value} ×`;


    chip.addEventListener("click", () => {

        const toggleFunction =
            filterToggleFunctions[type];


        if(toggleFunction){

            toggleFunction(actualValue);

        }

    });


    container.appendChild(chip);

}


/*
 * Filters a card list using all selected filters.
 *
 * Multiple selections within the same category
 * use OR logic.
 *
 * Different filter categories use AND logic.
 */
function filterCards(cardList){

    return cardList.filter(card => {


        /*
         * Rarity
         */
        if(
            selectedRarities.length > 0 &&
            !selectedRarities.includes(card.rarity)
        ){

            return false;

        }


        /*
         * Mana Cost
         *
         * 10 represents 10 or more.
         */
        if(selectedManaCosts.length > 0){

            const cardMana =
                card.cost ?? 0;


            const manaMatches =
                selectedManaCosts.some(mana => {

                    if(mana === 10){

                        return cardMana >= 10;

                    }

                    return cardMana === mana;

                });


            if(!manaMatches){

                return false;

            }

        }


        /*
         * Power
         *
         * 10 represents 10 or more.
         */
        if(selectedPowers.length > 0){

            const cardPower =
                card.attack ?? 0;


            const powerMatches =
                selectedPowers.some(power => {

                    if(power === 10){

                        return cardPower >= 10;

                    }

                    return cardPower === power;

                });


            if(!powerMatches){

                return false;

            }

        }


        /*
         * Health
         *
         * 10 represents 10 or more.
         */
        if(selectedHealths.length > 0){

            const cardHealth =
                card.health ?? 0;


            const healthMatches =
                selectedHealths.some(health => {

                    if(health === 10){

                        return cardHealth >= 10;

                    }

                    return cardHealth === health;

                });


            if(!healthMatches){

                return false;

            }

        }


        /*
         * Card Type
         */
        if(
            selectedCardTypes.length > 0 &&
            !selectedCardTypes.includes(card.type)
        ){

            return false;

        }


        /*
         * Card Class
         */
        if(
            selectedCardClasses.length > 0 &&
            !selectedCardClasses.includes(card.cardClass)
        ){

            return false;

        }


        /*
         * Abilities
         *
         * Searches the card text for any
         * selected ability keyword.
         */
        if(selectedAbilities.length > 0){

            const cardText =
                (card.text || "").toLowerCase();


            const abilityMatches =
                selectedAbilities.some(ability =>
                    cardText.includes(
                        ability.toLowerCase()
                    )
                );


            if(!abilityMatches){

                return false;

            }

        }


        /*
         * Set
         */
        if(
            selectedSets.length > 0 &&
            !selectedSets.includes(card.set)
        ){

            return false;

        }


        return true;

    });

}

function clearAllFilters(){

    selectedRarities = [];
    selectedSets = [];
    selectedManaCosts = [];
    selectedPowers = [];
    selectedHealths = [];
    selectedCardTypes = [];
    selectedAbilities = [];
    selectedCardClasses = [];

    updateSelectedFilters();

}

function setPackRulesMode(enabled){

    const filterContainer =
        document.getElementById("filterContainer");

    if(!filterContainer){
        return;
    }


    if(enabled){

        /*
         * Clear every currently selected filter.
         */
        clearAllFilters();


        /*
         * Hide every filter except Card Set.
         */
        const filterGroups =
            filterContainer.querySelectorAll(".filter-group");


        filterGroups.forEach(group => {

            if(group.classList.contains("filter-set")){

                group.style.display = "";

            }
            else{

                group.style.display = "none";

            }

        });

    }
    else{

        /*
         * Restore all filters.
         */
        const filterGroups =
            filterContainer.querySelectorAll(".filter-group");


        filterGroups.forEach(group => {

            group.style.display = "";

        });

    }

}