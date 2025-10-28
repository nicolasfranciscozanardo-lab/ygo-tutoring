let updateScheduled = false;

function scheduleUpdateEdges() {
  if (updateScheduled) return; // already queued this frame
  updateScheduled = true;
  requestAnimationFrame(() => {
    updateScheduled = false;
    updateAll(); // call it once this frame
  });
}

function updateAll() {
  // clear svg
  while(svg.firstChild) 
    svg.removeChild(svg.firstChild);
  
  // draw edges
  for(const e of state.edges)
    drawEdge(e);
}

function drawEdge(e) {
  const from = document.querySelector(`[data-id="${e.from}"]`);
  const to = document.querySelector(`[data-id="${e.to}"]`);
  
  if(!from || !to) return;
  
  const p1 = rightOf(from);
  const p2 = leftOf(to);
  
  const path = document.createElementNS('http://www.w3.org/2000/svg','path');    
  path.setAttribute('d', makeCurve(p1,p2));
  path.setAttribute('stroke','rgba(6,182,212,0.9)');
  path.setAttribute('stroke-width','3');
  path.setAttribute('fill','none');
  svg.appendChild(path);
}

function unconnectedEdgeDraw(from, to) {
  const el = document.querySelector(`[data-id="${from}"]`);
  const p1 = rightOf(el);
  
  // create the path once
  if (!tempPath) {
    tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tempPath.setAttribute('stroke', 'rgba(6,182,212,0.5)');
    tempPath.setAttribute('stroke-width', 3);
    tempPath.setAttribute('fill', 'none');
    svg.appendChild(tempPath);
  }

  // update its "d" attribute each frame
  tempPath.setAttribute('d', makeCurve(p1,to));
}

function unconnectedEdgeClear() {
  if (tempPath) {
    tempPath.remove();
    tempPath = null;
  }
}

function makeCurve(p1,p2) {
  const dx = Math.abs(p2.x-p1.x);
  const curvature = Math.min(200, dx*0.5);
    
  return `M ${p1.x} ${p1.y} C ${p1.x + curvature} ${p1.y} ${p2.x - curvature} ${p2.y} ${p2.x} ${p2.y}`;
}

function rightOf(el) {
  const rect = el.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  return {
    x: (parseFloat(el.style.left) + el.offsetWidth) * zoomscale,
    y: (parseFloat(el.style.top) + el.offsetHeight/2) * zoomscale
  };
}

function leftOf(el) {
  const rect = el.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  return {
    x: (parseFloat(el.style.left)) * zoomscale,
    y: (parseFloat(el.style.top) + el.offsetHeight/2) * zoomscale
  };
}