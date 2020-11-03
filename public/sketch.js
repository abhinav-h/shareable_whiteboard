

const socket = io('/');  //socket connection

var peer = new Peer(undefined,{   //we undefine this because peer server create it's own user it
   host: '/',
   port: 3001,
   //path: '/peerjs'
});

peer.on('open', id =>{
 	     socket.emit('join-room', ROOM_ID, id); //if someone join room send roomid and userid to server
})

socket.on('user-connected', (userId) =>{   //userconnected so we now ready to share 
	    console.log('user ID fetch connection: '+ userId); //video stream
})
var change=true;
const board=document.getElementById("board");
function setup() {
  let can=createCanvas(800,400);
  background(255);
  button = createButton('clear');
  button.position(0, height+80);
  pen = createButton('pen');
  pen.position(0, height-40);
  eraser = createButton('eraser');
  eraser.position(0, height-80);
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(0, height );
  slider = createSlider(0, 25, 5,1);
  slider.position(0, height +40);
  slider.style('width', '80px');
  button.parent("board");
  can.parent("board");
  colorPicker.parent("board");
  slider.parent("board");
  pen.parent("board");
  eraser.parent("board");
  button.mousePressed(clearBG);
  eraser.mousePressed(mk_false);
  pen.mousePressed(mk_true);
  /*button.mousePressed(()=>{
    socket.emit('mouse', ROOM_ID);
  })*/
  socket.on('mouse', newDrawing);
  socket.on('clearing',()=>{
    background(255);
    //socket.emit("cleared",ROOM_ID);
  });
  board.style.visibility = "hidden";
}
const show = ()=>{
  if(board.style.visibility == "hidden")board.style.visibility = "visible";
  else board.style.visibility = "hidden";
}
function newDrawing(data){
  if(data.x>100){
  fill(data.c[0],data.c[1],data.c[2]);
  stroke(data.c[0],data.c[1],data.c[2]);
  strokeWeight(data.width);
    line(data.x,data.y,data.px,data.py);
  } 
}
function mouseDragged(){
  //console.log('sending:' + mouseX +','+ mouseY);
  //colorPicker.color=color('green');
	var data = {
		x : mouseX,
    y : mouseY,
    px : pmouseX,
    py : pmouseY,
    width : slider.value(),
    c : colorPicker.color().levels
  }
  if(change)data.c=colorPicker.color().levels;
  else data.c=[255,255,255];
  socket.emit('mouse', data, ROOM_ID);
  if(mouseX>100){
  fill(data.c[0],data.c[1],data.c[2]);
  stroke(data.c[0],data.c[1],data.c[2]);
  strokeWeight(slider.value());
    line(mouseX, mouseY,pmouseX, pmouseY);
  }
}

function clearBG(){
  background(255);
  socket.emit('clear', ROOM_ID);
}
function mk_true(){
  change=true;
}
function mk_false(){
  change=false;
}