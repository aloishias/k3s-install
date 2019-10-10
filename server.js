const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

app.get('/messageepsi', (req, res) => { res.send("hello") });
app.listen(3000);