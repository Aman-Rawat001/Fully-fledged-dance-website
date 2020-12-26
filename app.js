// IMPORTING MODULES
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 80;

//EXPRESS SPECIFIC STFF.
app.use('/static',express.static('static')) // for serving static files.
app.use(express.urlencoded()) 

//PUG SPECIFIC STUFF.
app.set('view engine', 'pug')  // set template engine as pug.
app.set('views', path.join(__dirname, 'views')) // set the view directory.

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params); // now serving home.pug(template file).
})
// FOR ABOUT PAGE REQUEST.
app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})

// FOR CONTACT PAGE REQUEST.
app.get('/contact', (req, res)=>{             
    const con = 'This is a demo variable'
    const params = {}  // Params is a variable.
    res.status(200).render('contact.pug', params) // sending title and content on the  index.pug file to display in browser.
})
let temp = 0;
app.post('/contact', (req, res)=>{

    name = req.body.name; 
    email = req.body.email; 
    phone = req.body.phone; 
    desc = req.body.desc; 
    let detailOfClint = `${++temp}: Name=${name} Email=${email} Phone=${phone} Address=${desc}\n` // (\n) for add newline in output file.
    
    fs.appendFileSync('Output.txt', detailOfClint)  // save submitted data in file('output.txt).

    const params = {}
    res.status(200).render('contact.pug', params); // now serving home.pug(template file).
})

// FOR SERVICES PAGE REQUEST.
app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})

// FOR CLASS PAGE REQUEST.
app.get('/class', (req, res)=>{
    const params = {}
    res.status(200).render('class.pug', params);
})

// START THE SERVER.
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});