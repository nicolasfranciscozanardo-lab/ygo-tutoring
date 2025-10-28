function makeSelectable(el) {
  el.addEventListener('click', e=>{
    e.stopPropagation();
    onSelect(el);
  });
}

function onSelect(el){
  if(selected)
    selected.style.boxShadow='0 6px 18px rgba(2,6,23,0.6)';
  selected = el;
  selected.style.boxShadow = '0 0 0 4px rgba(6,182,212,0.08)';
}

function stage_deselect(e) {
  /* click stage to deselect */
  if(e.target===stage && selected){
    selected.style.boxShadow='0 6px 18px rgba(2,6,23,0.6)';
    selected=null;
    selectionInfo.innerText='No selection'; 
  }
}


stage.addEventListener('mousedown', stage_deselect);
