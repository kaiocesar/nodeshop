// set up 
var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressLayout = require('express-ejs-layouts');
var configDB = require('./config/database.js');


// configuration
mongoose.connect(configDB.url);

require('./config/passport')(passport);



// set up our express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname + "/public")));
app.set('views', __dirname +"/app/views");
app.set('view engine','ejs');
app.set('layout','layouts/front');

app.use(expressLayout);

// require for passport
app.use(session({secret: '8b2864a9c1da71b4ccefe6872e8b9594'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// routes
require('./app/routes.js')(app, passport);


// launch
app.listen(port);


