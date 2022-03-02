const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// Models
const User = require('./models/User');

// Import Routes
const autocarRoutes = require('./routes/autocarRoutes')
const authRoutes = require('./routes/authRoutes')

// import controller
const AutocarController = require('./controllers/AutocarController')

// Template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Receber resposta do body
app.use(express.urlencoded({extended: true,}));

//session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages , messagens do sistema
app.use(flash());

//public path
app.use(express.static('public'));

// set session to res 
app.use((req, res, next) => {
    //console.log(req.session.userid);

    if(req.session.userid) {
       res.locals.session = req.session; 
    }

    next();
});

//routes 
app.use('/autocar', autocarRoutes)
app.use('/', authRoutes)

app.get('/', AutocarController.showAutocar)


conn
    .sync()
    .then(() => { app.listen(3000) })
    .catch((err) => console.log(err))