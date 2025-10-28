

// make svg fill the container
function resizeSVG(){
  const rect = stage.getBoundingClientRect();
  svg.setAttribute('width', rect.width);
  svg.setAttribute('height', rect.height);
  svg.style.width = rect.width+'px';
  svg.style.height = rect.height+'px'; 
}
window.addEventListener('resize', resizeSVG);
setTimeout(resizeSVG,100);

/*
// update preview periodically (keeps JSON in sync with node positions/ids)
setInterval(() => { // sync node list from DOM
  const domNodes = Array.from(document.querySelectorAll('.node')).map( el => ( {
    id: el.dataset.id,
    x: parseFloat(el.style.left),
    y: parseFloat(el.style.top),
    title: el.querySelector('.title').innerText 
  }));
  
  // ensure state.nodes ordering
  for(const dn of domNodes){
    const found = state.nodes.find(n=>n.id===dn.id);
    if(found) {
      found.x = dn.x;
      found.y = dn.y;
      found.title = dn.title; 
    }
  }
}, 500);
*/