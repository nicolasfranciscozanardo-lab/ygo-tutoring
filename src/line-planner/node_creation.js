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
  return createNode(80 + Math.random()*300, 80 + Math.random()*200, 'Step '+idCounter, cardid);
}
function createNode(x=60,y=60, title='Node',cardid=null){
  const id = 'n'+(idCounter++);
  const el = newHtmlNodeElement(id, x, y, title, cardid);
  
  state.nodes.push({
    id, x, y, title, cardid/*,
    w: el.offsetWidth,
    h: el.offsetHeight*/
  });
  
  scheduleUpdateEdges();
  return el;
};




function newHtmlNodeElement(id, x, y, title, cardid) {
  const el = document.createElement('div');
  el.className='node';
  el.dataset.id=id;
  el.style.left = x+'px';
  el.style.top = y+'px';
  el.innerHTML = `
    <div class="title">${title}</div>    
    <div class="handle" title="connect"></div>
  `;
  
  stage.appendChild(el);
  makeDraggable(el);
  makeSelectable(el);
  makeEditable(el);
  makeConnectable(el);
  loadCardImage(el, cardid);
  
  return el;
}
