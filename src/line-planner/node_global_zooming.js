const zoomStep = 0.1; // how much each wheel tick zooms
const minZoom = 0.3;
const maxZoom = 3;

function updateNodePosition(el, node) {
  el.style.left   = node.x * zoomscale + 'px';
  el.style.top    = node.y * zoomscale + 'px';
  
  el.style.width = node.w * zoomscale + 'px';
  el.style.height = node.h * zoomscale + 'px';
  el.style.transform = `scale(${zoomscale})`;
}

function btnZoomIn() {
  zoomscale = Math.min(maxZoom, Math.max(minZoom, zoomscale + zoomStep));
  updateZoomState();
}
function btnZoomOut() {
  zoomscale = Math.min(maxZoom, Math.max(minZoom, zoomscale - zoomStep));
  updateZoomState();
}
function btnZoomReset() {
  zoomscale = 1;
  updateZoomState();
}

function updateZoomState() {
  // update all nodes and edges
  for(const n of state.nodes) {
    const el = document.querySelector(`[data-id="${n.id}"]`);
    if(el) updateNodePosition(el, n);
  }
  scheduleUpdateEdges();
}