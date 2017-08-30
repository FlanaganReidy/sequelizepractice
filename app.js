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
