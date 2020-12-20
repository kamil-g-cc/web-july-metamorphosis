initDragAndDrop();

function initDragAndDrop() {
    shuffleCards();

    // Initialize drag & drop elements here

}

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
}

function initHandlers() {
    let cards = document.getElementsByClassName('card');
    for (const card of cards){
        card.addEventListener("dragstart", dragStartHandler);
    }
}

function dragStartHandler(event){
    console.debug("rozpoczął się drag & drop", event.target);
}