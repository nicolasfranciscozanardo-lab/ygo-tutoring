const ScriptLibrary = {
  files: [
    /*
    '../src/searcher/consts.js',
    '../src/searcher/form-behaviour.js',
    '../src/searcher/functions.js',
    */
    '../apis/YGOProdeck.js',
    '../src/searcher/consts.js',
    '../src/searcher/page-render.js',
    '../src/searcher/page-functions.js',
    '../src/searcher/event-functions.js',
    '../src/searcher/event-reactions.js',
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
