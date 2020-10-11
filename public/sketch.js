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

function setup() {
  createCanvas(400, 400);
  background(255);
  let clear1 = select('#clearCanvas');
  clear1.mousePressed(clearBG);
  socket.on('mouse', newDrawing);
}

function newDrawing(data){
	fill(122);
    ellipse(data.x, data.y, 10); 
}
function mouseDragged(){
	console.log('sending:' + mouseX +','+ mouseY);
	var data = {
		x : mouseX,
		y : mouseY
	}
    
         socket.emit('mouse', data, ROOM_ID);
 
	
	fill(0)
    ellipse(mouseX, mouseY,10);
}
function draw() {

}

function clearBG(){
	background(255);
}