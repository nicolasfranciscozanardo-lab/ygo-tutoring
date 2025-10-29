function btnAddCard_click() {
  const id = parseInt(prompt("Write card ID:"));
  if (isNaN(id) || id <= 1000000) {
    console.error("Invalid number: "+id.toString());
    return;
  }
  onSelect(newNode(id));
}

function btnAddNode_click() {
  onSelect(newNode());
}

window.addEventListener("message", ev => {
  const {action, id} = ev.data || {};
  
  switch(action) {
    case "add-card":
      onSelect(newNode(id));
      break;
    default:
      break;
  };
  return;
});


function newNode(cardid = null) {
  return createNode(cardid);
}
function createNode(cardid=null){
  const id = 'n'+(idCounter++);
  const el = newHtmlNodeElement(id, cardid);
  
  state.push(cardid);
  return el;
};

function newHtmlNodeElement(id, cardid) {
  const el = document.createElement('div');
  el.className='node';
  el.dataset.id=id;
  el.dataset.cardid=cardid;
  
  stage.appendChild(el);
  makeSelectable(el);
  loadCardImage(el, cardid);
  
  return el;
}
