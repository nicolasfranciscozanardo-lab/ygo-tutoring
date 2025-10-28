function btnDelete_click() {
  if(!selected) 
    return alert('Select a node to delete');
  const id = selected.dataset.id; // remove edges
  state.edges = state.edges.filter(e => e.from!==id && e.to!==id);
  state.nodes = state.nodes.filter(n => n.id!==id);
  selected.remove();
  selected=null;
  selectionInfo.innerText='No selection';
  scheduleUpdateEdges();
};

function btnClear_click() {
  if(!confirm('Clear all nodes and edges?'))
    return;
  state = { nodes: [], edges: [] };
  while(stage.firstChild)
    stage.removeChild(stage.firstChild); 
  scheduleUpdateEdges();
};