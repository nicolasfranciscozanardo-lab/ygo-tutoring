function apiLink_click(e) {
  e.preventDefault(); 
  window.open('https://db.ygoprodeck.com/api-guide/','_blank');
};

async function searchForm_submit(e) {
  e.preventDefault();
  
  const name = document.getElementById('q_name').value.trim();
  const archetype = document.getElementById('q_archetype').value.trim();
  const type = document.getElementById('q_type').value.trim();

  const params = {};
  if(name) params.fname = name;
  if(archetype) params.archetype = archetype;
  if(type) params.type = type;

  await doSearch(params);
};

async function btnRandom_click() {
  //await doSearch({}); 
  const randomUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset=0&sort=random&cachebust';
  setStatus('Cargando carta aleatoria...','loading');
  
  try {
    const r = await fetch(randomUrl);
    const d = await r.json();
    resultsEl.innerHTML = '';
    resultsEl.appendChild(renderCard(d.data[0] || d));
    setStatus('Carta aleatoria mostrada.');
  } catch(err) {
    setStatus('Error al cargar aleatoria: '+err.message, 'error');
  }
};

async function btnAll_click() {
  if(!confirm('Cargar todas las cartas descargará muchos datos (varios MB). Continuar?')) 
    return;
  
  await doSearch({});
}