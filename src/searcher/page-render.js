function setStatus(text, klass='') {
  statusEl.textContent = text;
  statusEl.className = klass ? ('small '+klass) : 'small';
}

function renderCard(card){
  const el = document.createElement('div');
  el.className = 'card';
  
  //_renderCardImage(el,card);
  _renderCardTitle(el,card);
  _renderCardMeta(el,card);
  _renderCardDescription(el,card);
  _renderCardAddButton(el, card);

  return el;
}

function _renderCardImage(el, card) {
  const img = document.createElement('img');
  const imgUrl = (card.card_images && card.card_images[0] && card.card_images[0].image_url) || '';
  img.src = imgUrl;
  img.alt = card.name;
  el.appendChild(img);
};

function _renderCardTitle(el, card) {
  const title = document.createElement('div');
  title.innerHTML = `<strong>${card.name}</strong> (${card.id})`;
  el.appendChild(title);
};

function _renderCardMeta(el, card) {
  const meta = document.createElement('div');
  meta.className = 'meta thin-text';
  meta.innerHTML = [
    card.type, 
    card.race, 
    card.attribute, 
    `<a href='${card.card_images && card.card_images[0] ? card.card_images[0].image_url : '#'}' target='_blank' class='thin-text'>Imagen</a>`
  ].filter(Boolean).join(' • ');
  el.appendChild(meta);
};

function _renderCardDescription(el, card) {
  if(!card.desc) return;
  
  const desc = document.createElement('div');
  desc.className = 'desc small-text';
  desc.textContent = card.desc;
  el.appendChild(desc);
};

function _renderCardAddButton(el, card) {
  const btnAdd = document.createElement('button');
  btnAdd.className = "teal"
  btnAdd.textContent = "<- Add";
  btnAdd.onclick = () => {
    parent.postMessage({ action: "add-card", id: card.id }, "*");
  };
  el.appendChild(btnAdd);
}