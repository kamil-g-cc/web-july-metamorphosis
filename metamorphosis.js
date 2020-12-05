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
    const cards = document.getElementsByClassName("card");
    const slots = document.getElementsByClassName("card-slot");
    for(const card of cards){
        //card.setAttribute('draggable', true)
        card.addEventListener('dragstart', dragstartHandler);
        card.addEventListener('dragend', dragendHandler);
    }
    for(const slot of slots){
        slot.addEventListener("dragenter", dragenterHandler);
        slot.addEventListener("dragover", dragoverHandler);
        slot.addEventListener("dragleave", dragleavHandler);
        slot.addEventListener("drop", dropHandler);
    }
}

function dragstartHandler(event){
    toggleCardSlots();
    event.dataTransfer.setData('text/plain', this.id)
    console.debug("dragstartHandler called", event.target);
}

function dragendHandler(event){
    console.debug("dragendHandler called", event.target);
    toggleCardSlots(true);
}

function toggleCardSlots(off = false){
    const slots = document.getElementsByClassName("card-slot");
    for( const slot of slots){
        if(off){
            slot.classList.remove('card-slot-highlighted');
        } else {
            slot.classList.add('card-slot-highlighted');
        }
    }
}

function dragenterHandler(event){
    console.debug("dragenterHandler called", event.target);
    event.target.classList.add('card-slot-over');
    event.preventDefault();
}
function dragleavHandler(event){
    console.debug("dragleavHandler called", event.target);
    event.target.classList.remove('card-slot-over');
    event.preventDefault();
}
function dragoverHandler(event){
    event.preventDefault();
}
function dropHandler(event){
    let id = event.dataTransfer.getData('text/plain')
    event.target.appendChild(document.getElementById(id));
    console.debug("dropHandler called", id);
    
}
