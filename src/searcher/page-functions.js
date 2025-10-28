async function doSearch(params){
  const cards = await YGOProdeck.search(params);
  resultsEl.innerHTML = '';
  for(const c of cards){
	resultsEl.appendChild(renderCard(c));
  }
  if(cards.length === 0) resultsEl.innerHTML = '';
}