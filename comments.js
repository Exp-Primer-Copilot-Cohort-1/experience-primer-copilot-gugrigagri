// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Create server
const http = require('http');
const server = http.createServer(app);
// Create socket
const io = require('socket.io')(server);
// Create MongoDB
const mongoose = require('mongoose');
// Create Schema
const Schema = mongoose.Schema;
// Create model
const Comment = mongoose.model('Comment', new Schema({
  content: String
}));
// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');
// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// Use ejs
app.set('view engine', 'ejs');
// Use static files
app.use(express.static('public'));
// Use socket
io.on('connection', (socket) => {
  console.log('A user connected');
  // Listen to client
  socket.on('client-send-comment', (data) => {
    io.sockets.emit('server-send-comment', data);
    Comment.create({ content: data }, (err, comment) => {
      if (err) console.log(err);
      else console.log(comment);
    });
  });
});
// Listen to port
server.listen(3000, () => console.log('Server started!'));
// Routing
app.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) console.log(err);
    else res.render('home', { comments: comments });
  });
});