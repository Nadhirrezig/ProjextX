const express = require('express');
const http = require('http');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = 5000;

/////////////////////////////////////////////////////////////////////Parsing DATA////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));
app.use(express.static('Views'));

app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));


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
    return res.sendFile(path.join(__dirname, 'View', 'Admin.html'));
  }
  res.redirect('/login');
    
  });