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
    let cardSlots = document.getElementsByClassName('metamorphosis-slots');
    for (const card of cards){
        card.addEventListener("dragstart", dragStartHandler);
        card.addEventListener("dragend", dragEndHandler);
    }
    for (const card of cardSlots){
        card.addEventListener("dragover", dragOverHandler);
        card.addEventListener("drop", dropHandler);
    }
}

function dragStartHandler(event){
    console.debug("rozpoczął się drag & drop", event.target);
    togleCardSlots();
    event.target.classList.add('card-highlighted');
}

function dragEndHandler(event){
    console.debug("zakończył się drag & drop", event.target);
    togleCardSlots(true);
    event.target.classList.remove('card-highlighted');

}

function dragOverHandler(event){
    console.debug("drag over...")
    event.preventDefault();
}
function dropHandler(event){
    console.debug("drop")
}

function togleCardSlots(off = false){
    const slots = document.getElementsByClassName('card-slot');
    for (const slot of slots){
        if(off){
            slot.classList.remove('card-slot-highlighted')
        } else {
            slot.classList.add('card-slot-highlighted')
        }
    }
}
