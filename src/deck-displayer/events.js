

// make svg fill the container
function resizeSVG(){
  const rect = stage.getBoundingClientRect();
  svg.setAttribute('width', rect.width);
  svg.setAttribute('height', rect.height);
  svg.style.width = rect.width+'px';
  svg.style.height = rect.height+'px'; 
}
window.addEventListener('resize', resizeSVG);
setTimeout(resizeSVG,100);
