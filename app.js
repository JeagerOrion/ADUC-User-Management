if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

require('win-ca');

const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const port = 3000
const secret = process.env.SECRET;

const sessionConfig = {
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use(flash())

const loginRoutes = require('./routes/login')
const createRoutes = require('./routes/create')

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.user_id = req.session.user_id;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', loginRoutes);
app.use('/create', createRoutes);



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})