class Node {
  constructor(x = 60, y = 60, title = 'Node', cardid = null) {
    this.id = 'n' + (idCounter++);
    this.x = x;
    this.y = y;
    this.title = title;
    this.cardid = cardid;
    
    this.el = this.#createElement();
    stage.appendChild(this.el);
    
    makeDraggable(this.el);
    makeSelectable(this.el);
    makeEditable(this.el);
    makeConnectable(this.el);
    
    if (cardid) {
      this.#loadCardImage(cardid);
    }
    
    state.nodes.push({
      id: this.id,
      x: this.x,
      y: this.y,
      title: this.title,
      cardid: this.cardid
    });
    
    scheduleUpdateEdges();
  }
  
  // --- Private helpers ---
  #createElement() {
    const el = document.createElement('div');
    el.className = 'node';
    el.dataset.id = this.id;
    el.style.left = this.x + 'px';
    el.style.top = this.y + 'px';
    el.innerHTML = `
      <div class="title">${this.title}</div>
      <div class="handle" title="connect"></div>
    `;
    return el;
  }
}
