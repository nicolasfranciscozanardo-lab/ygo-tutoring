function _makeDraggable(el){
  let ox,oy, sx,sy;
  let dragging=false;
  
  el.addEventListener('mousedown', e=> {
    if(e.button!==0) return;
    //if(e.target.closest('.handle')) return;
    
    dragging=true;
    ox=e.clientX;
    oy=e.clientY;
    sx=parseFloat(el.style.left);
    sy=parseFloat(el.style.top);
    el.style.cursor='grabbing';
  });
  
  window.addEventListener('mousemove', e=>{
    if(!dragging) return; 

    // mouse delta adjusted by zoom
    const dx = (e.clientX - ox);
    const dy = (e.clientY - oy);

    const nx = sx + dx;
    const ny = sy + dy;

    el.style.left = nx + 'px';
    el.style.top = ny + 'px';

    updateNodePos(el.dataset.id, nx, ny);
    scheduleUpdateEdges();
  });
  
  window.addEventListener('mouseup', e=>{
    if(!dragging) return;
    
    dragging=false; 
    el.style.cursor='grab'; 
  });
};

function makeDraggable(el){
  let ox, oy, sx, sy;
  let dragging = false;

  el.addEventListener('mousedown', e => {
    if(e.button !== 0) return;
    dragging = true;
    ox = e.clientX;
    oy = e.clientY;
    sx = parseFloat(el.style.left) / zoomscale;
    sy = parseFloat(el.style.top)  / zoomscale;
    el.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if(!dragging) return;
    const nx = sx + (e.clientX - ox) / zoomscale;
    const ny = sy + (e.clientY - oy) / zoomscale;

    el.style.left = nx * zoomscale + 'px';
    el.style.top  = ny * zoomscale + 'px';

    updateNodePos(el.dataset.id, nx, ny);
    scheduleUpdateEdges();
  });

  window.addEventListener('mouseup', e => {
    if(!dragging) return;
    dragging = false;
    el.style.cursor = 'grab';
  });
}

function updateNodePos(id,x,y){
  const n = state.nodes.find(x=>x.id===id);
  if(n){ 
    n.x = x;
    n.y = y;
  }
};