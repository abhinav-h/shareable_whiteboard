const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) =>{
	res.redirect(`/${uuidV4()}`);  //send uuid to client address bar 
 })

app.get('/:room', (req, res) =>{
	let addRoomId = req.params.room;
    //console.log(addRoomId);
	res.render('room',{roomId: `${addRoomId}` }); //get id from address bar and send to ejs
})

io.on('connection', socket =>{
	
	//code to disconnect user using socket simple method ('join-room')
	socket.on('join-room',(roomId, userId) =>{
		//console.log("room Id:- " + roomId,"userId:- "+ userId);    //userId mean new user 
		socket.join(roomId); 
		socket.to(roomId).broadcast.emit('user-connected',userId);
	});
	socket.on('mouse', mouseMsg);
	socket.on('clear',(roomid)=>{
		socket.to(roomid).emit('clearing');
	})
	function mouseMsg(data, roomId, userId){
		socket.to(roomId).broadcast.emit('mouse',data);
		//console.log(data);
	}
});		

server.listen(3000, () =>{
	console.log("Serving port 3000")
});