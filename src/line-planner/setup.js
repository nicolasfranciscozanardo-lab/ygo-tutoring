// Simple flow editor: nodes, drag, connect (click source -> click target), basic export/import
const stage = document.getElementById('stage');
const svg = document.getElementById('svg-lines');
const jsonPreview = document.getElementById('jsonPreview');
const selectionInfo = document.getElementById('selectionInfo');
const fileImport = document.getElementById('file-import');
const btnDownload = document.getElementById('btn-download');

let state = { nodes: [], edges: [] };
let idCounter = 1;
let selected = null;
let tempPath = null;
let zoomscale = 1;
