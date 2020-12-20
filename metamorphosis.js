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

        card.addEventListener("dragenter", dragEnterHandler);
        card.addEventListener("dragleave", dragLeaveHandler);
    }
}

function dragStartHandler(event){
    console.debug("rozpoczął się drag & drop", event.target.id);
    event.dataTransfer.setData('text/plain', event.target.id);
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
    event.target.classList.add('card-slot-highlighted-drop');
    event.preventDefault();
}
function dropHandler(event){
    let id = event.dataTransfer.getData("text/plain")
    let el = document.getElementById(id);
    event.target.appendChild(el);
    console.debug("drop", id)
    event.target.classList.remove('card-slot-highlighted-drop');
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

function dragEnterHandler(event){
    
}

function dragLeaveHandler(event){
    event.target.classList.remove('card-slot-highlighted-drop');
}