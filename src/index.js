const express= require("express")
const app = express()
const path= require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname,"../templates")

app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.urlencoded({extended:false}));

app.get("/login",(req,res) => {
    res.render("login");
});

app.get("/signup",(req,res) => {
    res.render("signup");   
});


app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
        mob_no: req.body.mob_no,
        email: req.body.email
    };

    try {
        await collection.insertMany([data]);
        res.render("Home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error inserting data");
    }
});     

app.post("/login", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    try {
        const check = await collection.findOne({ name: req.body.name });
        if(check.password == req.body.password ){
            res.render("Home");
        }
        else{
            res.render("login");
        }
    } 
    catch (error) {
        console.error(error);
        res.send("Invalid Login");
        
    }
});     


app.listen(3001,() => {
    console.log("Port Connected");
});

