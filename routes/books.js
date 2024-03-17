const express = require("express")

const{books} = require("../data/books.json")
const{users} = require("../data/users.json")

const router = express.Router()

/**
 * ROUTE: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameter:None
 **/

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
})

/**
 * ROUTE: /books/:id
 * Method: GET
 * Description: Get a book by their Id
 * Access: Public
 * Parameter:Id
 **/

router.get("/:id",(req,res)=>{
    const {id}= req.params
    const book = books.find((each)=>each.id === id)
    if (!book) {
        return res.status(404).json({
            success:false,
            message:"Book Not Found For The Given Id"
        })
    }
    return res.status(200).json({
        success:true,
        data:book
    })

})
/**
 * ROUTE: /books/issued/by-user
 * Method: GET
 * Description: Get all the books issued
 * Access: Public
 * Parameter:Id
 **/
router.get("/issued/by-user",(req,res)=>{
    const userWithIssuedBooks = users.filter((each)=>{
        if (each.issuedBook) {
            return each
        }
    })
    const issuedBooks = []

    userWithIssuedBooks.forEach((each) => {
        const book = books.find((book)=> book.id === each.issuedBook)

        book.issueBy = each.name
        book.issueDate = each.issuedDate
        book.returnDate = each.returnDate

        issuedBooks.push(book)
    });
    if (issuedBooks.length === 0) 
        return res.status(404).json({
            success:false,
            message:"No Books has been Issued!"
        })
    
    return res.status(200).json({
        success:true,
        data:issuedBooks
    })
})

/**
 * ROUTE: /books
 * Method: POST
 * Description: Create a new Book
 * Access: Public
 * Parameter:None
 * Data:author,name,genre,price,publisher,id
 **/

router.post("/",(req,res)=>{
    const{data}=req.body

    if (!data) 
    return res.status(404).json({
success:false,
message:"No Data Provided!"
    })
    const book = books.find((each)=> each.id === data.id)
    if (book) 
    return res.status(404).json({
        success:false,
        message:"User with the given Id already Exist"
})
    const allBooks = [...books,data]
    return res.status(201).json({
        success:true,
        data:allBooks
    })
})
/**
 * ROUTE: /books/:id
 * Method: PUT
 * Description: Update a Book by their Id
 * Access: Public
 * Parameter:None
 * Data:author,name,genre,price,publisher,id
 **/
router.put("/:id",(req,res)=>{
    const {id} = req.params
    const {data} = req.body
    const book = books.find((each)=> each.id === id)
    if(!book)
        return res.status(404).json({
    success:false,
    message:"Book with the given id doesn't exist"
        })
    
        const updateData = books.map((each)=>{
            if(each.id === id){
                return {...each,...data}
            }
            return each
        })
        return res.status(200).json({
            success:true,
            data:updateData
        })
})
module.exports = router