// var socket = io('http://localhost:212');

$(document).ready(()=>{
	// var peer = new Peer({key:'jc6q9vr2m27w4s4i'});
	var idUser = 1;
	const peer = new Peer();
	async function turnOnProcess(){
		const config = {audio:true,video:true};
		const stream = await navigator.mediaDevices.getUserMedia(config);
		playVideo('me',stream);
	}

	function playVideo(idTag,stream){
		document.getElementById(idTag).srcObject = stream;
		document.getElementById(idTag).play();
	}
	peer.on('open',(id)=>{
		console.log('your id is:'+id);
		$('#your-id').append(id);
	});
	turnOnProcess();
}); 