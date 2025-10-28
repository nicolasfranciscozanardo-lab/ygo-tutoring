const tabsContainer = document.getElementById('tabs-container');
const btnAddTab = document.getElementById('btn-add-tab');
const tabStates = new WeakMap();

function btnAddTab_click(name = 'NewDiagram') {
  createTab(name);
}

function createTab(name = 'New Diagram') {
  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.textContent = name;
  
  tabStates.set(tab, { nodes: [], edges: [] });

  tab.addEventListener('dblclick', (e) => {
    tab.dataset.editing = true;
    tab.contentEditable = 'true';
    tab.focus();

    document.execCommand('selectAll', false, null);
    
    const stopEditing = (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        tab.blur();
      }
    };

    tab.addEventListener('keydown', stopEditing);

    tab.addEventListener('blur', () => {
      tab.contentEditable = 'false';
      delete tab.dataset.editing;
      tab.removeEventListener('keydown', stopEditing);
    }, { once: true });
  });
  
  tab.addEventListener('click', (e) => {
    if (!tab.dataset.editing && !tab.classList.contains('active'))
      selectTab(tab);
  });

  tab.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const confirmed = confirm(`Delete tab "${tab.textContent}"?`);
    if (confirmed) {
      tab.remove();
      const firstTab = tabsContainer.querySelector('.tab:not(#btn-add-tab)');
      if (firstTab) selectTab(firstTab);
    }
  });

  tabsContainer.insertBefore(tab, btnAddTab);
  selectTab(tab);
}

function selectTab(tab) {
  document.querySelectorAll('#tabs-container .tab').forEach(_unselectTab);
  _selectTab(tab);
}

function _selectTab(tab) {
  tab.classList.add('active');
  loadStateReference(tabStates.get(tab));
  tab.focus();

  console.log('Selected tab:', tab.textContent);
}

function _unselectTab(tab) {
  tab.classList.remove('active');  
  tab.contentEditable = 'false';
  delete tab.dataset.editing;
}

btnAddTab_click();