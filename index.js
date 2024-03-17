const express = require("express")
const {users} = require("./data/users.json")

const userRouter = require("./routes/users")
const booksRouter = require("./routes/books")
const app = express()

const PORT = 8081

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is Up and Running"
    })
})

app.use("/users",userRouter)
app.use("/books",booksRouter)

app.get("*",(req,res)=>{
    res.status(200).json({
        message:"This route doesnot exist"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is Up and Running on ${PORT}`);
})
