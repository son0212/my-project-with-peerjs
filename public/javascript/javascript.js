var socket = io('http://localhost:212');

$(document).ready(()=>{ 
	var peer = new Peer();
	var config = {audio:true,video:true};

	async function turnOnProcess(idTagIncludeNameUser,elseStream){
		const stream =  await navigator.mediaDevices.getUserMedia(config);
		document.getElementById(idTagIncludeNameUser).srcObject = elseStream || stream;
		document.getElementById(idTagIncludeNameUser).play();
	}

	peer.on('open',(id)=>{
		console.log('id:'+id);
		$('#your-id').append(id);
	});

	peer.on('call',async (call)=>{
		const stream =  await navigator.mediaDevices.getUserMedia(config);
		call.answer(stream);
		turnOnProcess('me');
		call.on('stream',(remoteStream)=>turnOnProcess('my-friend',remoteStream));
	});

	$('#btn-submit-id-user').click(async ()=>{
		const id = $('#id-for-call').val();
		const stream =  await navigator.mediaDevices.getUserMedia(config);
		const call = peer.call(id,stream);
		turnOnProcess('me');
		call.on('stream',(remoteStream)=>turnOnProcess('my-friend',remoteStream));
		document.getElementById('id-for-call').value = "";
	});

	$('#btn-submit-name-user').click(()=>{
		const name = $('#name').val();
		const peerId = $('#your-id').text().slice(8);
		socket.emit('name-new-user',{name:name,peerId:peerId});
		document.getElementById('name').value = "";
	});

	socket.on('list-user-online',(data)=>{
		$('#sign-up-name').hide();
		$('#support').show();
		$('#list-user').html('');
		data.map((user)=>{
			return $('#list-user').append(`<li onClick="getPeerId('${user.peerId}')"  id="${user.peerId}">${user.name}</li>`);
		});
	});
	socket.on('you-already-nickname',(data)=>{
			alert(data);
	});

	socket.on('warning',(data)=>{
		alert(data);
	});
	socket.on('you-need-a-peerId',(data)=>{
		alert(data);
	});
	socket.on('responsive-call-to-peerId',async (data)=>{
		const stream =  await navigator.mediaDevices.getUserMedia(config);
		const call = peer.call(data,stream);
		turnOnProcess('me');
		call.on('stream',(remoteStream)=>turnOnProcess('my-friend',remoteStream));
	});
	//=============================================================================
}); 