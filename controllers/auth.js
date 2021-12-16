const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {  
    api_key: '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'
  }
}));

exports.getLogin = (req, res, next) => {
  let message =  req.flash('error');
  if(message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message // accessing key 
       
    });
};
exports.getSignup = (req, res, next) => {
  let message =  req.flash('error');
  if(message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: message // accessing key 
 
    });
  };
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
      if(! user){
        req.flash('error', 'Invalid email');
        return  res.redirect('/login'); 
      }
      bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if(doMatch){ // check if the passowrd are equals
          req.session.isLoggedIn = true; 
          req.session.user = user;
          return req.session.save((err)=> {
             res.redirect('/');
          });

         }
         req.flash('error', 'Invalid Password');          
         res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
   
   
     
    })
    .catch(err => console.log(err));
   
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword =  req.body.confirmPassword;

  User.findOne({email: email})
  .then(userDoc => {
    if(userDoc){
      req.flash('error', 'E-mail exists already, register a different one.');    
      return res.redirect('/signup');
    }
    if(password !== confirmPassword){
      req.flash('error', 'Password does not match with confirmation password');    
      return res.redirect('/signup');
    }
    return bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: {items:[]}
      });
      console.log(user);
      return user.save(); 
    })
    .then(result => {
      res.redirect('/login');
      return transporter.sendMail({
        to: email,
        from: 'rodriguezhr25@byui.edu',
        subject: 'Signup succeeded!!',
        html: '<h1>You successfully signed up!</h1>'        
      });
     
    }).catch(err => {
      console.log(err);
   }); 
     
  })  
  .catch(err => {
     console.log(err);
  });

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};