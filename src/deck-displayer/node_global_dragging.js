/*//-- GLOBAL DRAGGING --//*/
function globalDraggingStart() {
let dragging = false;
let ox, oy;
let startPositions = [];

stage.addEventListener('mousedown', e => {
  // Only if left click and not on a node
  if (e.button !== 0 && e.button !== 1) return;
  if (e.target.closest('.node')) return; // skip if clicking on a node

  dragging = true;
  ox = e.clientX;
  oy = e.clientY;

  // Record start positions of all nodes
  startPositions = state.nodes.map(n => ({
    id: n.id,
    x: n.x,
    y: n.y
  }));

  stage.style.cursor = 'grabbing';
  
  if (e.button === 1)
    e.preventDefault();
});

window.addEventListener('mousemove', e => {
  if (!dragging) return;

  const dx = e.clientX - ox;
  const dy = e.clientY - oy;

  // Move every node
  for (const s of startPositions) {
    const n = state.nodes.find(x => x.id === s.id);
    if (!n) continue;

    const nx = s.x + dx;
    const ny = s.y + dy;
    n.x = nx;
    n.y = ny;

    const el = document.querySelector(`[data-id="${n.id}"]`);
    if (el) {
      el.style.left = nx + 'px';
      el.style.top = ny + 'px';
    }
  }

  scheduleUpdateEdges();
});

window.addEventListener('mouseup', e => {
  if (!dragging) return;
  dragging = false;
  stage.style.cursor = 'default';
});

// --- Two-finger / touchpad dragging (mostly laptops) ---
stage.addEventListener('wheel', e => {
  // Only two-finger scroll (not zooming) — prevent default vertical/horizontal scroll
  if (e.ctrlKey) return; // allow zoom with ctrl+wheel
  e.preventDefault();

  const dx = -e.deltaX;
  const dy = -e.deltaY;

  // Move every node
  for (const n of state.nodes) {
    n.x += dx;
    n.y += dy;
    const el = document.querySelector(`[data-id="${n.id}"]`);
    if (el) {
      el.style.left = n.x + 'px';
      el.style.top = n.y + 'px';
    }
  }

  scheduleUpdateEdges();
}, { passive: false }
);

};
globalDraggingStart();