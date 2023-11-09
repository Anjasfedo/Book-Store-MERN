import express from 'express';
import mongoose from 'mongoose';
import {PORT, mongoDBURL} from './config.js'
// import {Book} from './models/bookModel.js'

import bookRoute from './routes/bookRoute.js'

const app = express();

// middleware untuk parsing request body
app.use(express.json());

// http request get /
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hello World')
});


// book route
app.use('/books', bookRoute)


// 

// Dimasukkan ke dalam method then mongoose
// app.listen(PORT, () => {
//     console.log(`App listening Port: ${PORT}`)
// });

// Mengkoneksikan ke mongodb dengan mongoose menggunakan mongoDBURL
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected with Database')
        app.listen(PORT, () => {
            console.log(`App listening Port: ${PORT}`)
        });        
    })
    .catch((error) => {
        console.log(error)
    });