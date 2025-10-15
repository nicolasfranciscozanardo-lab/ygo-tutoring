function setStatus(text, klass='') {
  statusEl.textContent = text;
  statusEl.className = klass ? ('small '+klass) : 'small';
}

function buildQuery(params) {
  const esc = encodeURIComponent;
  const qs = Object.entries(params)
	.filter(([k,v]) => v !== null && v !== undefined && String(v).trim() !== '')
	.map(([k,v]) => `${esc(k)}=${esc(v)}`)
	.join('&');
  return qs ? `${API_BASE}?${qs}` : API_BASE;
}

async function fectchCardTrySection(url) {
	const res = await fetch(url);
	
	if(!res.ok) {
		throw new Error('HTTP '+res.status);
	}
	
	const data = await res.json();
	if(!data.data || data.data.length === 0){
	  setStatus('No se encontraron cartas.', 'empty');
	  return [];
	}
	setStatus(`Encontradas ${data.data.length} cartas.`);
	return data.data;
}


async function fetchCards(url) {
  setStatus('Cargando...', 'loading');
  resultsEl.innerHTML = '';
  try{
	return await fectchCardTrySection(url);
  } catch(err) {
	try {
		return await fectchCardTrySection(url);
	} catch(err) {
		console.error(err);
		setStatus('Error al consultar la API: Filtro invalido.', 'error');
		return [];
	}
  }
}

async function doSearch(params){
  const url = buildQuery(params);
  const cards = await fetchCards(url);
  resultsEl.innerHTML = '';
  for(const c of cards){
	resultsEl.appendChild(renderCard(c));
  }
  if(cards.length === 0) resultsEl.innerHTML = '';
}

function renderCard(card){
  const el = document.createElement('div');
  el.className = 'card';

  //const img = document.createElement('img');
  //const imgUrl = (card.card_images && card.card_images[0] && card.card_images[0].image_url) || '';
  //img.src = imgUrl;
  //img.alt = card.name;
  //el.appendChild(img);

  const title = document.createElement('div');
  title.innerHTML = `<strong>${card.name}</strong>`;
  el.appendChild(title);

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = [card.type, card.race, card.attribute].filter(Boolean).join(' • ');
  el.appendChild(meta);

  if(card.desc){
	const desc = document.createElement('div');
	desc.className = 'desc';
	desc.textContent = card.desc;
	el.appendChild(desc);
  }

  const linkRow = document.createElement('div');
  linkRow.className = 'meta';
  linkRow.innerHTML = `<a href='${card.card_images && card.card_images[0] ? card.card_images[0].image_url : '#'}' target='_blank'>Imagen</a> • <a href='https://db.ygoprodeck.com/card/?search=${encodeURIComponent(card.name)}' target='_blank'>Ver en YGOPRODeck</a>`;
  el.appendChild(linkRow);

  return el;
}