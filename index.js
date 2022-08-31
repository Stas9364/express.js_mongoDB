// содежимое index.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const users = require("./users_router");

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(MONGODB_URI);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 7542;

app.use('/users', users);

app.get('/',  (req, res) => {
    res.send('<h1>Main page</h1>');
});

app.get('/tasks',  (req, res) => {
    res.send('<h1>Tasks</h1>');
});

app.use(function(req, res){
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});