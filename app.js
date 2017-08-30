const models = require('./models');

function createUser(){
  const user = models.User.build({
    name: 'Shannon Reidy',
    email: 'shannonf.reidy@gmail.com',
    bio: 'sorceress'
  });

user.save()
.then(function(newUser){
  console.log(newUser.dataValues);
})

}

function listUsers(){
  models.User.findAll().then(function(users){
    users.forEach(function(user){
      console.log(user.dataValues);
    })
  })
}
listUsers();
