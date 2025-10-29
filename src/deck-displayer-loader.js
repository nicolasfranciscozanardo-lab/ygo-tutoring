const ScriptLibrary = {
  files: [
    '../src/deck-displayer/setup.js',
    '../src/deck-displayer/node_creation.js',
    '../src/deck-displayer/node_deletion.js',
    '../src/deck-displayer/node_persistance.js',
    '../src/deck-displayer/node_selection.js',
    '../src/deck-displayer/events.js',
    '../src/deck-displayer/node_image_handler.js',
    '../src/deck-displayer/page_tab_handling.js',
    '../src/deck-displayer/initialize.js',
  ],

  async load() {
    for (const src of this.files) {
      await this.addScript(src);
    }
    console.log('All scripts loaded.');
  },

  addScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
};
ScriptLibrary.load();
