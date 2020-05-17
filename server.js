const express = require('express');
const Datastore = require('nedb');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Listening to + ${port}`);
})

const database = new Datastore('database.db');

database.loadDatabase();

var names = {'names': "ming"};
database.insert(names);
var names = {'names': "hello"};
database.insert(names);
var names = {'names': "yes"};
database.insert(names);
var names = {'names': "great"};
database.insert(names);

var db_length;
var words;

app.get('/pulldb', (request, response) => {

    console.log('came here');
    database.find({}, (err, docs) => {
        console.log(docs.length);

        response.json({
            db_length: docs.length,
            word: docs
        });

    });
    
});