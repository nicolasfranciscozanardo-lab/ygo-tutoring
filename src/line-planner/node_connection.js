let modeConnect = false;
let connectFrom = null;
const btnConnect = document.getElementById('btn-connect');

function startConnect(el){
  modeConnect = true;
  btnConnect.classList.add('active');
  connectFrom = el.dataset.id;
};

function finishConnection(el) {
  if (!connectFrom) return;
  if (connectFrom == el.dataset.id) {
    stopConnect();
    return;
  }
  state.edges.push({ from: connectFrom, to: el.dataset.id });
  scheduleUpdateEdges();
  stopConnect();
}

function stopConnect(){
  modeConnect = false;
  btnConnect.classList.remove('active');
  connectFrom = null;
  unconnectedEdgeClear();
};

function makeConnectable(el) {
  el.querySelector('.handle').addEventListener('mousedown', e => {
    e.stopPropagation();
    handleConnection(el);
  });
  
  //el.querySelector('.handle').addEventListener('click', e => {
  //  e.stopPropagation();
  //  handleConnection(el);
  //});
  
  el.addEventListener('mouseup', e => {
    finishConnection(el);
  });
};

function handleConnection(el) {
  if (modeConnect && connectFrom) {
    finishConnection(el);
  } else if (modeConnect) {
    connectFrom = el
  } else {
    startConnect(el);
  }
}

function _btnConnect_click() {
  state.edges.push({ from: "n1", to: "n2"});
  scheduleUpdateEdges();
}

function btnConnect_click() {
  if(modeConnect) {
    stopConnect();
  } else {
    modeConnect = true;
    btnConnect.classList.add('active');
    connectFrom = null;
    alert('Click the round handle on the node you want to start from, then click the target node to connect.');
  }
};

function stage_cancelConnect(e) {
  if (modeConnect) 
    stopConnect();
};

function window_connectionDrag(e) {
  if (!modeConnect || !connectFrom)
    return;
  e.stopPropagation();
  let mousePos = {
    x: e.clientX - stage.getBoundingClientRect().left,
    y: e.clientY - stage.getBoundingClientRect().top,
  };
  unconnectedEdgeDraw(connectFrom, mousePos);
  
};


stage.addEventListener('click', stage_cancelConnect);
window.addEventListener('mousemove', window_connectionDrag);