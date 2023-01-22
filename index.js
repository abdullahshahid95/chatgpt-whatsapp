const express = require('express'),
body_parser = require("body-parser");
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express().use(body_parser.json());
// Enable body parser
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

app.use('/completion', require('./routes/completion'));

app.get('/hello', async (req, res) => {
    res.status(200).json({
        message: "Success!"
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));