function btnDelete_click() {
  if(!selected) 
    return alert('Select a node to delete');
  const id = selected.dataset.id;
  removeFirst(state, parseInt(selected.dataset.cardid));

  selected.remove();
  selected=null;
};

function btnClear_click() {
  if(!confirm('Clear all nodes and edges?'))
    return;
  state = [];
  while(stage.firstChild)
    stage.removeChild(stage.firstChild); 
};

function removeFirst(arr, value) {
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}