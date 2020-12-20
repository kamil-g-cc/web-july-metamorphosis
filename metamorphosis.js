initDragAndDrop();

function initDragAndDrop() {
    shuffleCards();
    initHandlers();
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
        card.addEventListener("dragend", dragEndHandler);
    }
}

function dragStartHandler(event){
    console.debug("rozpoczął się drag & drop", event.target);
    event.target.classList.add('card-highlighted');
}

function dragEndHandler(event){
    console.debug("zakończył się drag & drop", event.target);
    event.target.classList.remove('card-highlighted');

}