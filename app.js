const express = require('express');
const app = express();
const port = 3000;
const getNextCode = require('./connectdb');

// Set EJS as view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    getNextCode((error, code) => {
        if (error) {
            res.status(500).send('เกิดข้อผิดพลาดในการดึง code');
        } else {
            res.render('index', { code: code });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
