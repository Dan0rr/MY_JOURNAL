const express = require ('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, ()=> console.log('listening currently at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

let dataBase = new Datastore('database.db');
dataBase.loadDatabase();

app.get('/api', (request, response) => {
    dataBase.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        } 
        response.json(data);
    });
});

app.post('/api',(request,response) => {
    console.log('Someone is requesting their location');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    dataBase.insert(data);
    response.json(data);
});

