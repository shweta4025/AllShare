const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;

app.listen(PORT , ()=>{
       console.log(`listening on port ${PORT}`);
});


app.use(express.static('finalCSS'));
app.use(express.json());

const mongoConnect = require('./database/mdb');
mongoConnect();

//cors
const corsOption = {
       origin: 'http//localhost:3000'
}
app.use(cors(corsOption));

// template engine
app.set('final', path.join(__dirname,'/final'));
app.set('view engine','ejs');


//paths

app.use('api/files', require('./paths/files'));
app.use('/files', require('./paths/show'));
app.use('/files/download', require('./paths/download'));

