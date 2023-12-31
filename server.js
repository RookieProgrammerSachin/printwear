const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./server/database/connection');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000


// app.use(morgan('tiny'));

// app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.use('/', require('./server/routes/router'))

//connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
    }
).catch((err) => {
    console.log(err);
})


app.get('/barath', (req, res) => {
    
    res.render('mockup');
})
// app.post('/my-endpoint', (req, res) => {
//     console.log("hello");
//     const myVariable = req.body.myVariable;
//     console.log(myVariable);
//     // modell.create({Frontimage:myVariable})
//     // .then((x)=>{
//     //     // console.log(kumar);
//     //     res.redirect('/view');
//     // })
//     // .catch((y)=>{
//     //     console.log("heiii");
//     //     console.log(y)
//     // })
// });

