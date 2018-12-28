const express = require('express');
const app = express();
const AddUserRouter = express.Router();

const AddUser = require('../models/AddUser');

AddUserRouter.route('/addUser').post(function (req, res) {
  console.log("yes");
//  const AddUser = new AddUser(req.body);
  // AddUser.save()
  //   .then(AddUser => {
  //       res.json('User added successfully');
  //   })
  //   .catch(err => {
  //   res.status(400).send("unable to save to database");
  //   });
});


ServerPortRouter.route('/addUser').post(function (req, res) {
  const serverport = new ServerPort(req.body);
  serverport.save()
    .then(serverport => {
        res.json('Server added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


// AddUserRouter.route('/').get(function (req, res) {
//     AddUser.find(function (err, AddUsers){
//     if(err){
//       console.log(err);
//     }
//     else {
//       res.json(AddUsers);
//     }
//   });
// });

module.exports = AddUserRouter;