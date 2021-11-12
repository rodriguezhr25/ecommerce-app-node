const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User =  require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
     User.findById('618dcf5735703c6ec46963e1')
       .then(user => {
         req.user = user;        
         next();
       })
       .catch(err => console.log(err));
  });
  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
app.use(errorController.get404);
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

mongoose.connect('mongodb+srv://hector:Cantaura2021@cluster0.edtor.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'Hector',
        email: 'hr@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();
      
    }
  });
  app.listen(PORT);
})
.catch(err => {
  console.log(err);
});
