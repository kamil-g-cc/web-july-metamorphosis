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
    let mixedCardsContainer = document.querySelector(".mixed-cards");
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

    mixedCardsContainer.addEventListener("dragover", mixedCardsDragHandler);
    mixedCardsContainer.addEventListener("drop", mixedCardsDropHandler);

    mixedCardsContainer.addEventListener("dragenter", mixedCardsEnterHandler);
    mixedCardsContainer.addEventListener("dragleave", mixedCardsLeaveHandler);
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
    let mixedCardsContainer = document.querySelector('.mixed-cards');
    let id = event.dataTransfer.getData("text/plain")
    let el = document.getElementById(id);
    let old = null;
    if(event.target.nodeName=="IMG"){
        event.target.parentNode.parentNode.appendChild(el);
        old = event.target.parentNode;
        mixedCardsContainer.appendChild(old);
    } else {
        event.target.appendChild(el);
    }
    
    console.debug("drop", id)
    event.target.classList.remove('card-slot-highlighted-drop');
}

function togleCardSlots(off = false){
    const slots = document.getElementsByClassName('card-slot');
    const mixedCardsContainer = document.querySelector('.mixed-cards');
    for (const slot of slots){
        if(off){
            slot.classList.remove('card-slot-highlighted');
            mixedCardsContainer.classList.remove('mixed-cards-highlighted');
        } else {
            slot.classList.add('card-slot-highlighted')
            mixedCardsContainer.classList.add('mixed-cards-highlighted');
        }
    }
}

function dragEnterHandler(event){
    
}

function dragLeaveHandler(event){
    event.target.classList.remove('card-slot-highlighted-drop');
}

function mixedCardsDragHandler(event){
    event.preventDefault();
}

function mixedCardsDropHandler(event){
    let id = event.dataTransfer.getData('text/plain');

    let el = document.getElementById(id);
    console.debug("drop mixed", event.target);
    if(event.target.nodeName=="IMG"){
        event.target.parentNode.parentNode.appendChild(el);
    } else {
        event.target.appendChild(el);
    }
}

function mixedCardsEnterHandler(event){
    if(event.target.nodeName=="IMG"){
        event.target.parentNode.parentNode.classList.add('mixed-cards-highlighted-drop')
    } else{
        event.target.classList.add('mixed-cards-highlighted-drop');
    }
}
function mixedCardsLeaveHandler(event){
    event.target.classList.remove('mixed-cards-highlighted-drop');
}

function checkWin(){
    let win = false
    let frogs_correct = ['f1', 'f2', 'f3', 'f4'];
    let buterflies_correct = ['b1', 'b2', 'b3', 'b4'];
    let frogs = document.getElementById('metamorphosis-slots-frog').children;
    let buterflies = document.getElementById('metamorphosis-slots-butterfly').children;
    let i = 0;
    for(let frog of frogs){
        if(frogs_correct[i++]!=frog.firstElementChild.id){
            return false;
        }
    }
    i = 0;
    for(let buterfy of buterflies){
        if(buterflies_correct[i++]!=buterfy.firstElementChild.id){
            return false;
        }
    }
    return true;


}