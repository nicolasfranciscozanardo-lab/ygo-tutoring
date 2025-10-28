const ScriptLibrary = {
  files: [
    '../src/line-planner/setup.js',
    '../src/line-planner/node_edge_display.js',
    '../src/line-planner/node_connection.js',
    '../src/line-planner/node_creation.js',
    '../src/line-planner/node_deletion.js',
    '../src/line-planner/node_dragging.js',
    '../src/line-planner/node_edition.js',
    '../src/line-planner/node_persistance.js',
    '../src/line-planner/node_selection.js',
    '../src/line-planner/events.js',
    '../src/line-planner/node_global_dragging.js',
    '../src/line-planner/node_global_zooming.js',
    '../src/line-planner/node_image_handler.js',
    '../src/line-planner/page_tab_handling.js',
    '../src/line-planner/initialize.js',
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
