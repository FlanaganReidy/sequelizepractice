const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const models = require('./models');

let app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.render('index');
})
app.get('/users', function(req, res) {
  models.User.findAll()
    .then(function(userslist) {
      res.render('usersgui', {
        userskey: userslist
      });
    })
})
app.get('/adduser', function(req, res) {
  res.render('adduser');
})
app.post('/adduser', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const bio = req.body.bio;
  const user = models.User.build({
    name: name,
    email: email,
    bio: bio
  });

  user.save()
    .then(function() {
      res.redirect('/users')
    })

})
app.post('/delete/:id', function(req, res) {
  let id = req.params.id;
  models.User.destroy({
      where: {
        id: id
      }
    })
    .then(function() {
      res.redirect('/users');
    })
})
app.get('/update/:id', function(req, res) {
  let id = req.params.id;
  models.User.findOne({
      where: {
        id: id
      }
    })
    .then(function(user) {
      res.render('updateuser', {
        userskey: user
      })
    })
})
app.post('/update/:id', function(req, res) {
  let id = req.params.id
  const upname = req.body.name;
  const upemail = req.body.email;
  const upbio = req.body.bio;
  const user = models.User.update({
    name: upname,
    email: upemail,
    bio: upbio
  }, {
    where: {
      id: id
    }
  })
    .then(function() {
      res.redirect('/users')
    })

})

app.listen(3000, function() {
  console.log('successfully started Express Application');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});









// function createUser(){
//   const user = models.User.build({
//     name: 'Shannon Reidy',
//     email: 'shannonf.reidy@gmail.com',
//     bio: 'sorceress'
//   });
//
// user.save()
// .then(function(newUser){
//   console.log(newUser.dataValues);
// })
//
// }
//
// function listUsers(){
//   models.User.findAll().then(function(users){
//     users.forEach(function(user){
//       console.log(user.dataValues);
//     })
//   })
// }
// listUsers();
