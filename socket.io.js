const io = require('./index.js');

var listUser = [];

module.exports = (socket)=>{
 	console.log('User just connected have id:'+socket.id);

 	socket.on('disconnect',()=>{
 		for(var i=0;i<listUser.length;i++){
 			if(socket.id == listUser[i].socketId){
 				listUser.splice(i,1);
 			}
 		}
 		io.emit('list-user-online', listUser);
 		console.log('User juse disconnected have id:'+ socket.id);
 	});

 	socket.on('name-new-user',(data)=>{
 		if(!data.peerId){
 			socket.emit('you-need-a-peerId','you need a peerId for sign up name');
 			return;
 		}
 		for(var i=0;i<listUser.length;i++){
 			if(listUser[i].peerId == data.peerId){
 				socket.emit('you-already-nickname',"you already have an name");
 				return;
 			}
 			if(listUser[i].name == data.name){
 				socket.emit('warning','User existed!');
 				return;
 			}
 		}
 		listUser.push({name:data.name,peerId:data.peerId,socketId:socket.id});
 		io.emit('list-user-online', listUser);
 		console.log(listUser);
 	});

 	socket.on('call-to-peerId',(data)=>{
 		socket.emit('responsive-call-to-peerId',data);
 	});
}