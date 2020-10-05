const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('public'));

app.get('/',(req,res)=>{
	res.render('index');
});

const port = process.env.PORT || 212;

const server = app.listen(port, () => {
    console.log(`The server has been started at the port: ${port} or http://localhost:${port}`);
});

var io = require('socket.io').listen(server);

module.exports = io;

io.on('connection',require('./socket.io.js'));