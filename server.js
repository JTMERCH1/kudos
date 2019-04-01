const express = require ('express');
const mongoose = require ('mongoose');

const app = express ();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/improvements";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

require('./routes/api-routes')(app);

app.listen(PORT, function () {
    console.log(`Listening on Port ${PORT}`)
});