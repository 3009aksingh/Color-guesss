const express = require('express');

const expressLayouts = require('express-ejs-layouts');
const webPush = require('web-push');

const path = require('path');

const bodyParser = require('body-parser');
const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');

// Public
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/main", (req, res) => { //links main website with PWA's public folder
  res.render("main.ejs");
})

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use('/', require('./routes/index.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));