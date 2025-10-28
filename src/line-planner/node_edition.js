function makeEditable(el) {
  el.addEventListener('dblclick', e=> {
    e.stopPropagation();
    editNode(el);
  });
}

function editNode(el){
  const title = prompt('Node title', el.querySelector('.title').innerText);
  if(title===null) return;
  
  el.querySelector('.title').innerText = title;
  const n = state.nodes.find(x=>x.id===el.dataset.id);
  if(n) n.title = title;
}
