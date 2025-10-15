apiLink.addEventListener('click', e=>{
  e.preventDefault(); window.open('https://db.ygoprodeck.com/api-guide/','_blank')
})

searchForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = document.getElementById('q_name').value.trim();
  const archetype = document.getElementById('q_archetype').value.trim();
  const type = document.getElementById('q_type').value.trim();

  const params = {};
  if(name) params.fname = name;
  if(archetype) params.archetype = archetype;
  if(type) params.type = type;

  await doSearch(params);
});

document.getElementById('btnRandom').addEventListener('click', async ()=>{
  await doSearch({}); // fetch all then pick random on client? API has randomcard.php but cross-origin may block; use randomcard endpoint
  // Try using random endpoint
  const randomUrl = 'https://db.ygoprodeck.com/api/v7/randomcard.php';
  setStatus('Cargando carta aleatoria...','loading');
  try{
	const r = await fetch(randomUrl);
	const d = await r.json();
	resultsEl.innerHTML = '';
	resultsEl.appendChild(renderCard(d.data[0] || d));
	setStatus('Carta aleatoria mostrada.');
  }catch(err){
	setStatus('Error al cargar aleatoria: '+err.message, 'error');
  }
});

document.getElementById('btnAll').addEventListener('click', async ()=>{
  // WARNING: this returns a large payload (~12k cards). Use with caution.
  if(!confirm('Cargar todas las cartas descargará muchos datos (varios MB). Continuar?')) return;
  await doSearch({});
});

// Friendly note: if page loads with ?name=... in querystring, perform search
(function autoFromQS(){
  const qs = new URLSearchParams(location.search);
  const name = qs.get('name');
  const archetype = qs.get('archetype');
  const type = qs.get('type');
  if(name || archetype || type){
	document.getElementById('q_name').value = name || '';
	document.getElementById('q_archetype').value = archetype || '';
	document.getElementById('q_type').value = type || '';
	searchForm.dispatchEvent(new Event('submit'));
  }
})();