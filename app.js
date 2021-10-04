const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000
app.listen(PORT);