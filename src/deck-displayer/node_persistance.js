function btnExport_click() {
  const data = JSON.stringify(state, null, 2);
  navigator.clipboard.writeText(data).then(() => alert('JSON copied to clipboard')); 
};

async function btnImportFromClipboard_click() {
  try {
    const text = await navigator.clipboard.readText();
    if (!text) {
      alert('Clipboard is empty or inaccessible.');
      return;
    }

    let obj;
    try {
      obj = JSON.parse(text);
    } catch (err) {
      alert('Clipboard does not contain valid JSON.');
      return;
    }

    loadState(obj);
    alert('Diagram loaded from clipboard!');
  } catch (err) {
    console.error('Clipboard read failed:', err);
    alert('Unable to read clipboard. Your browser may not allow clipboard access here.');
  }
}


function fileImport_change(e) {
  const f = e.target.files[0];
  if(!f) return;
  const reader = new FileReader();
  reader.onload = ()=> {
    try {
      const obj = JSON.parse(reader.result);
      loadState(obj);
    } catch(err) {
      alert('Invalid JSON')
    }
  };
  reader.readAsText(f);
};

function __getFilename() {
  let filename = prompt('Enter filename to save as:', 'diagram.json');
  if (!filename || filename.trim() === '')
    return null;
  
  filename = filename.trimEnd();
  if (!filename.trimEnd().endsWith('.json'))
    filename += '.json';
  
  return filename;
}

function btnDownload_click() {
  const filename = __getFilename();
  if (!filename) return;
  
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href=url;
  a.download=filename;
  a.click();
  
  URL.revokeObjectURL(url);
}


function loadState(obj) { // simple loader
  createTab();
  idCounter = 1;
  
  while(stage.firstChild)
    stage.removeChild(stage.firstChild);
  
  if(obj) {
    for(const n of obj) {
      const el = newNode(n); // ensure id preserved
    }
    idCounter = obj.length + 1;
  }
};

function loadStateReference(obj) {
  state = obj;
  idCounter = 1;
  
  while(stage.firstChild)
    stage.removeChild(stage.firstChild);
  
  for(const n of obj) {
    const el = newHtmlNodeElement(idCounter++,n||null);
  }
}

fileImport.addEventListener('change', fileImport_change);