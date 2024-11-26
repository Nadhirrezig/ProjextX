const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const session = require('express-session');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 5000;

/////////////////////////////////////////////////////////////////////Parsing DATA////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));
app.use(express.static('Views'));

app.use(session({ secret: 'Nadhir_2872004', resave: false, saveUninitialized: true }));


const users = {
  admin: { password: 'admin123', role: 'admin' }
};

/////////////////////////////////////////////////////////////login page//////////////////////////////////////////////////////////

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
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
let recentActivities = [];

io.on('connection', (socket) => {
  console.log("New client connected");

  socket.on('new-login', (loginData) => {
    const activity = {
      socketId: socket.id,
      Ip_address: loginData.Ip_address,
      timestamp: loginData.timestamp,
    };
    recentActivities.push(activity);
    io.emit('recent-activity', recentActivities);
  });
  socket.on('disconnect', () => {
    const activity = recentActivities.find((activity) => activity.socketId === socket.id);
    if (activity) {
      console.log(`IP: ${activity.Ip_address} | Time: ${new Date(activity.timestamp).toLocaleString()} is disconnected`);
    }
  });
}); //// wlh karazt wlh 20:37PM 26/11/2024
