import express, { request, response } from 'express';
import mongoose from 'mongoose';
import {PORT, mongoDBURL} from './config.js'
import {Book} from './models/bookModel.js'

const app = express();

// middleware untuk parsing request body
app.use(express.json());

// http request get /
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hello World')
});



// request untuk menyimpan buku baru
app.post('/books', async (request, response) => {
    try{
        // validasi
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({message: 'Send all required field: title, author, publishYear'})
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook)

        return response.status(201).send(book)

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// request menampilkan seluruh books
app.get('/books', async (request, response) => {
    try{
        const books = await Book.find({})
        
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// request menampilkan book berdasarkan id
app.get('/books/:id', async (request, response) => {
    try{

        const {id} = request.params;

        const book = await Book.findById(id)
        
        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// request untuk mengubah(update) book
app.put('/books/:id', async(request, response) => {
    try{
        // validasi
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({message: 'Send all required field: title, author, publishYear'})
        }

        const {id} = request.params;

        const bookUpdate = await Book.findByIdAndUpdate(id, request.body)

        if(!bookUpdate){
            response.status(404).json({message: 'Book not found!'})
        }

        return response.status(200).json({message: 'Book successfuly updated!'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// request untuk menghapus(delete) book
app.delete('/books/:id', async (request, response) => {
    try{

        const {id} = request.params;

        const bookDelete = await Book.findByIdAndDelete(id, request.body)

        if(!bookDelete){
            response.status(404).json({message: 'Book not found!'})
        }

        return response.status(200).json({message: 'Book successfuly deleted!'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

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