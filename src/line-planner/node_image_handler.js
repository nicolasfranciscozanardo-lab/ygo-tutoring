async function loadCardImage(el, cardid) {
  if (!cardid) return;
  
  try {
    const imgSrc = await YGOProdeck.searchImgById(cardid);
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = cardid;
    img.className = 'ygoimg';
    img.draggable = false;
    el.appendChild(img);
    scheduleUpdateEdges();
  } catch (err) {
    console.error('Failed to load card image:', err);
  }
}