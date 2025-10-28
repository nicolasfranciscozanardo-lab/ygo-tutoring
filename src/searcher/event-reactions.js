document.getElementById('apiLink').addEventListener('click', apiLink_click);
document.getElementById('searchForm').addEventListener('submit', searchForm_submit);

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
    document.getElementById('searchForm').dispatchEvent(new Event('submit'));
  }
})();