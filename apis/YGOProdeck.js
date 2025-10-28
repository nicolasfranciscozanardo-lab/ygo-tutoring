// === YGOProdeck.js ===
const YGOProdeck = (() => {
  const API_BASE = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  // --- Internal helpers ---
  function _buildQuery(params) {
    const esc = encodeURIComponent;
    const qs = Object.entries(params)
      .filter(([k, v]) => v !== null && v !== undefined && String(v).trim() !== '')
      .map(([k, v]) => `${esc(k)}=${esc(v)}`)
      .join('&');
    return qs ? `${API_BASE}?${qs}` : API_BASE;
  }

  async function _fetchSection(url) {
    const res = await fetch(url);

    if (!res.ok) throw new Error('HTTP ' + res.status);

    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      return [];
    }
    return data.data;
  }

  async function _fetchCards(url) {    
    try {
      return await _fetchSection(url);
    } catch (err) {
      try {
        return await _fetchSection(url);
      } catch (err2) {
        console.error(err2);
        return [];
      }
    }
  }

  // --- Public search methods ---

  async function search(params) {
    const url = _buildQuery(params);
    const cards = await _fetchCards(url);
    
    return cards;
  }

  async function searchById(id) {
    return search({ id });
  }
  
  async function searchImgById(id) {
    const card = (await search({ id }))[0];
    return (card.card_images && card.card_images[0] && card.card_images[0].image_url_small) || '';
  }

  async function searchByIds(ids) {
    return search({ id: ids.join(',') });
  }

  async function searchByName(name) {
    return search({ fname: name });
  }

  async function searchByArchetype(archetype) {
    return search({ archetype });
  }

  // --- Public API ---

  return {
    // optional UI hooks
    statusEl: null,

    // searching
    search,
    searchById,
    searchByIds,
    searchByName,
    searchByArchetype,
    searchImgById,
  };

})();
