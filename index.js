const express= require("express")
const app = express()
const {UserModel,TodoModel}=require("./db")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const {auth,SECRET_KEY}=require("./auth")


app.use(express.json())
mongoose.connect("mongodb+srv://admin:admin%401234@cluster0.1x6s6.mongodb.net/todo-app-database")

app.post("/signup",async function(req,res){
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    
   await UserModel.create({
        email:email,
        password:password,
        name:name
    })

    res.json({
        message:"You are logged in"
    })
})
app.post("/sigin", async function(req,res){
    const email = req.body.email
    const password = req.body.password
    const user = await UserModel.findOne({
        email:email,
        password:password
    })
    
    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        },SECRET_KEY);
    res.json({
        token:token
    });
}else{
    res.status(403).json({
        message:"Incorrect Credentials"
    })
}
})

app.post("/todo", auth, async function(req,res){
    const title = req.body.title
    const done = req.body.done

   await TodoModel.create({
        title:title,
        done:done,
        userId:req.userId
    })
    res.json({
        "message":"Todo added"
    })
})
app.get("/todos", auth,async function(req,res){
    const todos = await TodoModel.find({
        userId:req.userId
    })
    res.json(todos)
})


app.listen(3000,()=>{
    console.log("Running at port 3000")
})