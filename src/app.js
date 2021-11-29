const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

const PORT = 4567;

const app = express();
// setting view engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('fkjghkfjhkfjkfhjk'));

// express session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

//express flash
app.use(flash());

app.get('/', (req, res) => {
  let emailErr = req.flash('emailErr');
  let nameErr = req.flash('nameErr');
  let pointsErr = req.flash('pointsErr');

  //prettier-ignore
  emailErr =
    (emailErr == undefined || emailErr.length == 0) ? undefined : emailErr;

  res.render('index', {
    emailErr,
    nameErr,
    pointsErr,
    email: req.flash('email'),
  });
});

app.post('/form', (req, res) => {
  const { email, name, points } = req.body;

  let emailErr;
  let pointsErr;
  let nameErr;

  if (email == undefined || email == '') {
    emailErr = 'O email não pode ser vazio';
  }

  if (name == undefined || name == '') {
    nameErr = 'O nome não pode ser vazio';
  }

  if (points == undefined || points < 20) {
    pointsErr = 'Você não pode enviar dados com menos de 20 pontos';
  }

  if (emailErr != undefined || nameErr != undefined || pointsErr != undefined) {
    req.flash('emailErr', emailErr);
    req.flash('nameErr', nameErr);
    req.flash('pointsErr', pointsErr);

    req.flash('email', email);

    res.redirect('/');
  } else {
    res.send({ ok: 'Tudo certo por aqui' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
