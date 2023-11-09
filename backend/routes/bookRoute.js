import express from 'express'

import {Book} from '../models/bookModel.js'

const router = express.Router()

// request untuk menyimpan buku baru
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async(request, response) => {
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
router.delete('/:id', async (request, response) => {
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

export default router;