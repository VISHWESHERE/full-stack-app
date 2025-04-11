import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();

//Route for saving books
router.post("/", async (req, res, next)=>{
try {
    if(!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({Error: "Please provide all the required fields"});
    }
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
} catch (error) {
    console.log("getting this error:", error.message);
    res.status(500).send({Error: error.message});
}
});

//Route for getting all books
router.get("/", async(req, res)=>{
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count:books.length,
            data:books,
        });
    } catch (error) {
        console.log("getting this error:", error.message);
        res.status(500).send({Error: error.message});
    }
});

//Route for getting one book from id 
router.get("/:id", async(req, res)=>{
    try {

        const {id} = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log("getting this error:", error.message);
        res.status(500).send({Error: error.message});
    }
});

//Route for updating a book
router.put("/:id", async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({Error: "Please provide all the required fields"});
        }

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({Message: "Book not found"})
        }
        return res.status(200).send({Message: "Successfully updated the book"});


    } catch (error) {
        console.log("getting this error:", error.message);
        res.status(500).send({Error: error.message});
        
    }
})

//Route for deleting a book
router.delete("/:id", async(req, res)=>{
    try {
        const {id}= req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({Message: "Book not found"})
        }
        return res.status(202).send({Message:"Book deleted successfully"});
        
    } catch (error) {
        console.log("getting this error:", error.message);
        res.status(500).send({Error: error.message});
    }
});


export default router;