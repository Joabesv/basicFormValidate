const express = require('express');
const session = require('express-session');
const flash = require('express-flash');

const PORT = 4567;

const app = express();
// setting view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//express flash
app.use(flash());

app.get('/', (req, res) => {
  console.log('all good');
  res.send('all good');
});

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
