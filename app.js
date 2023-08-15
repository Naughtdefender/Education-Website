const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactEducation', { useNewUrlParser: true});

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    text: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true })); // Specify extended option

app.set('view engine', 'html');
app.set('index', path.join(__dirname, 'index.html'));
app.engine('html', require('ejs').renderFile); // Make sure 'ejs' is installed

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save()
        .then(() => {
            res.status(200).render('index.html', { successMessage: "Item has been saved to the database" });
        })
        .catch(() => {
            res.status(400).render('index.html', { errorMessage: "Item was not saved to the database" });
        });
});



app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
