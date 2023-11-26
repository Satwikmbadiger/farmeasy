const express= require("express")
const app = express()
const path= require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname,"../templates");
const publicPath = path.join(__dirname, 'public');

app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.static(templatePath));
app.use(express.static(publicPath));


app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
console.log(publicPath);

app.get("/",(req,res) => {
    res.render("login");
});

app.get("/signup",(req,res) => {
    res.render("signup");   
});

app.get("/Home",(req,res) => {   
    res.render("Home");
}); 


app.post("/signup", async (req, res) => {
    console.log(req.body);

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

app.post("/Home", async (req, res) => {     
    res.render("Home");
});
app.post("/login", async (req, res) => {
    const data = {
        mob_no: req.body.mob_no,
        password: req.body.password
    };

    try {
        const check = await collection.findOne({ mob_no: req.body.mob_no });
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

