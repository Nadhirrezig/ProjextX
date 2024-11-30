const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
const session = require('express-session');
const app = express();
const server = http.createServer(app);
const io = socketIo(server); 
const PORT = 5000;

/////////////////////////////////////////////////////////////////////Parsing DATA////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));
app.use(express.static('Views'));
app.use(express.static(path.join(__dirname,'Public','clienT_env')));

app.use(session({ secret: 'niggabich', resave: false, saveUninitialized: true }));


const users = {
  admin: { password: 'admin123', role: 'admin' }
};
/////////////////////////////////////////////////////////////Order Menu\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'clienT_env','index.html'));
})
/////////////////////////////////////////////////////////////login page//////////////////////////////////////////////////////////

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

//////////////////////////////////////////////////////////////login permissions///////////////////////////////////////////////////////
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log("your in the /login submit is running");
  const user = users[username];

  if (user && user.password === password) {
    console.log("your in user = pass condition");
    req.session.user = user;
    if (user.role === 'admin') {
      console.log("your in the if condition of admin");
      return res.redirect('/admin');
    }
  }
  res.redirect('/login');
});

//////////////////////////////////////////////////////////////////////////admin interface with low level permission/////////////////////////////////////////////////////////
app.get('/admin', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    console.log('admin connected');
    return res.sendFile(path.join(__dirname, 'Views', 'Admin.html'));
  }
  res.redirect('/login');
    
  });
/////////////////////////////////////////////////////////////////////////socket.io functions for the recent activitie status \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
io.on('connection', (socket) => {
  console.log('A new client connected:', socket.id);

  socket.emit('alert', 'You are connected to the server!');

  socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
  });
}); //// wlh karazt wlh 20:37PM 26/11/2024




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});