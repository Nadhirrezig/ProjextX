const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
const session = require('express-session');
const { timeStamp, time } = require('console');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 5000;

/////////////////////////////////////////////////////////////////////Parsing DATA////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'Public')));
app.use(express.static(path.join(__dirname,'Views')));
app.use(express.static(path.join(__dirname,'Views','AdminOverview')));
app.use(express.static(path.join(__dirname,'Public','clienT_env')));
app.use(session({ secret: '21NOV2021', resave: false, saveUninitialized: true }));
app.set('trust proxy', true);

const users = {
  admin: { password: 'admin123', role: 'admin' }
};
/////////////////////////////////////////////////////////////Order Menu\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'Public','clienT_env','index.html'));
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
    const clientIp = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    const processedClientIp = clientIp.startsWith('::ffff:') ? clientIp.replace('::ffff:', '') : clientIp;
    const Login_data = {
      Ip_address : processedClientIp,
      timeStamp : Date.now()
    }

    const ip = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
    const processedIp = ip.startsWith('::ffff:') ? ip.replace('::ffff:', '') : ip;

    console.log(`A new client connected: ${processedClientIp} \nwith a Public IP of ${processedIp} \nsocket id: ${socket.id}`);

    io.emit("activity",Login_data);
    


  socket.on('disconnect', () => {
    console.log(`This Client: ${processedClientIp} \nwith a Public IP of ${processedIp} has disconnected \nsocket id: ${socket.id}`);
    socket.emit("activitie",Login_data);
  });
}); //// <3 Finally
/////////////////////////////////////////////////////////////////////controlling LINKs\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get('/admin/overview', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return res.sendFile(path.join(__dirname, 'Views', 'AdminOverview', 'overview.html'));
  }
  res.redirect('/login');
});



server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});