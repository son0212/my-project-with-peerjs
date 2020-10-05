// var socket = io('http://localhost:212');

$(document).ready(()=>{
	const peer = new Peer();
	async function turnOnProcess(){
		const config = {audio:true,video:true};
		const stream = await navigator.mediaDevices.getUserMedia(config);
		playVideo('me',stream);
		socket.emit('data-emit',stream);
		socket.on('emit-all',(data)=>{
			playVideo('my-friend',data);
		});
	}

	function playVideo(idUser,stream){
		document.getElementById(idUser).srcObject = stream;
		document.getElementById(idUser).play();
	}
	peer.on('open',(id)=>{
		console.log('your id is:'+id)
		$('#your-id').append(id);
	});
	turnOnProcess();
}); 