const express = require("express")
const{users} = require("../data/users.json")

const router = express.Router()

/**
 * ROUTE: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameter:None
 **/

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})

/**
 * ROUTE:  /users/:id
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parameter:id
 **/

router.get("/:id",(req,res)=>{
    const{id}=req.params
    const user = users.find((each) =>   each.id === id)

        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            data:user
        })
    })

/**
 * ROUTE: /users
 * Method:POST
 * Description: Create the New User
 * Access: Public
 * Parameter:None
 **/

router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} =req.body
    const user = users.find((each) => each.id === id)

    if (user) {
        return res.status(404).json({
            success:false,
            message:"User with given Id exist"
        })
    }
    users.push({
        id,name,surname,email,subscriptionType,subscriptionDate
    })
    return res.status(201).json({
        success:true,
        data : users
    })
})
/**
 * ROUTE:  /users/:id
 * Method:PUT
 * Description: Updating a User data by their Id
 * Access: Public
 * Parameter:id
 **/

router.put("/:id",(req,res)=>{
    const{id} = req.params
    const{data}= req.body

    const user = users.find((each)=>each.id === id)

    if (!user) 
    return res.status(404).json({success:false, message:"User with given Id doesnot exist"})

    const updatedUser = users.map((each)=>{
        if (each.id === id) {
            return {
                ...each,
                ...data}
            }
            return each
    })
    return res.status(200).json({
        success:true,
        data :updatedUser
    })
})

/**
 * ROUTE:  /users/:id
 * Method:DELETE
 * Description: Delete a user by their Id
 * Access: Public
 * Parameter:id
 **/

router.delete("/:id",(req,res)=>{
    const {id} = req.params

    const user = users.find((each)=> each.id === id)

    if (!user) {
        return res.status(404).json({
            success:false,
            message:"User with the given doesn't exist"
        })
    }
    const index = users.indexOf(user)
    users.splice(index,1)

    return res.status(200).json({
        success:true,
        data:users
    })
})
/**
 * ROUTE: /users/subscription-details/:id
 * Method: GET
 * Description: Get all the subscription details
 * Access: Public
 * Parameter:None
 **/
router.get("/subscription-details/:id",(req,res)=>{
    const {id}=req.params
    const user = users.find((each)=> each.id === id)

    if (!user)
    return res.status(404).json({
        success:false,
        message:"User Not Found!"
    })

    const getDateInDays = (data = "")=>{
        let date
        if(date === ""){
            date = new Date()
        }else{
            date = new Date(data)
        }
        let days = Math.floor(date/1000*60*60*24)
        return days
    }

    const subscriptionType =(data)=>{
        if (user.subscriptionType === "Basic") {
            date = date+90
        }
        else if (user.subscriptionType === "Standard") {
            date = date+180
        }
        else if (user.subscriptionType === "Premium") {
            date = date+365
        }
        return date
    }
    let returnDate= getDateInDays(user.returnDate)
    let currentDate = getDateInDays()
    let subscriptionDate = getDateInDays(user.subscriptionDate)
    let subscriptionExpiration = subscriptionType(subscriptionDate)

    const data = {
        ...user,
        subscriptionExpired:subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 :subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration<=currentDate ? 200 : 100 : 0
    }
    return res.status(200).json({
        success:true,
        data:data
    })
})
module.exports = router