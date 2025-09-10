const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Secret = "t0d0S3cr3t"
const {signSchema, todoSchema} = require("./zodTypes")
const {User, Todo} = require("./db");
const cors = require('cors');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, Secret, (err, user) => {
            if(err){
                res.status(403).json({message : "Authentication failed!", err})
            }else{
                req.username = user.username;
                next();
            }
        });
    }else{
        res.status(403).json({message : "Authorization token not found!"});
    }
}


app.use(cors());
app.use(express.json());

//me

app.get("/me", authenticateUser, async(req, res) => {
    const user = await User.findOne({ username: req.username });
    if (user) {
        res.status(200).json({username : req.username});
    }else{
        res.status(403).json({message : "User doesn't exist!"});
    }
})


// signup
app.post("/signup", async(req, res) => {
    const {username, password} = req.body;
    const parsedData = signSchema.safeParse({username, password});
    if(parsedData.success){
        const user = await User.findOne({username});
        if(user){
            res.status(403).json({message : "User already exists! Please log in."});
        }else{
            const newUser = new User({username, password});
            await newUser.save();
            const token = jwt.sign({username }, Secret, {expiresIn : '1h'});
            res.status(200).json({token : token, message : "User created successfully!"});
        }
    }else{
        res.status(403).json({message : "You've sent wrong inputs!"}); 
    }
})


//login
app.post("/login", async(req, res) => {
    const {username, password} = req.body;
    const parsedData = signSchema.safeParse({username, password});
    if(parsedData.success){
        const user = await User.findOne({username, password});
        if(user){
            const token = jwt.sign({username}, Secret, {expiresIn : '1h'});
            res.status(200).json({token : token, message : "You're logged in successfully!"});
        }else{
            res.status(403).json({message : "User not found! please sign in first."});
        }
    }else{
        res.status(403).json({message : "You've sent wrong inputs!"});
    }
})


// create todo
app.post("/todo", authenticateUser, async(req, res) => {
    const {title, description} = req.body;
    const parsedData = todoSchema.safeParse({title, description});
    if(parsedData.success){
        const user = await User.findOne({username : req.username});
        if(user){
            const newTodo = {
                title : title,
                description : description,
                isCompleted : false
            }
            const todo = new Todo(newTodo);
            const resTodo = await todo.save();
            user.todos.push(resTodo);
            await user.save();
            res.status(200).json({message : "Todo created successfully!"});
        }else{
            res.status(403).json({message : "User not found!"});
        }
    }else{
        res.status(403).status({message : "You've sent wrong inputs!"});
    }
})


// get all todos
app.get("/todos", authenticateUser, async(req, res) => {
    const user = await User.findOne({username : req.username}).populate('todos');
    if(user){
        res.status(200).json({todos : user.todos || []})
    }else{
        res.status(403).json({message : "User not found!"});
    }
})  

// get specific todo
app.get("/todos/:todoId", authenticateUser, async(req, res) => {
    const todo = await Todo.findById(req.params.todoId)
    if(todo){
        res.status(200).json({todo});
    }else{
        res.status(403).json({message : "Todo not found!"})
    }
})


//edit todo
app.put("/edit-todos/:todoId", authenticateUser, async(req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {new :true});
    if(todo){
        res.status(200).json({todo : todo, message : "Todo edited successfully!"});
    }else{
        res.status(403).json({message : "Todo not found!"});
    }
})


//delete todo
app.delete("/todo/:todoId", authenticateUser, async(req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    if(todo){
        const user = await User.findOne({username : req.username});
        let index = user.todos.indexOf(todo._id);
        user.todos.splice(index, 1);
        await user.save();
        res.status(200).json({message : "Todo deleted successfully!"});
    }else{
        res.status(403).json({message : "Todo not found!"});
    }
})

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Todo-App" });

app.listen(3000, ()=> {
    console.log("love you 3000!")
});
