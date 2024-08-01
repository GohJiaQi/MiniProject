const express = require('express');
const mysql = require('mysql2')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'img')
    },
    filename: (req, file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'gohjiaqi',
    password: '12345678',
    database: 'qifoodfinder'
    });
    connection.connect((err) => {
    if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
    }
    console.log('Connected to MySQL database');
    });

const bodyParser = require('body-parser');
const e = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('img'));

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM stalls';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stalls');
        }
        res.render('index', { stalls: results });
    });
});

app.get('/aboutus', (req, res) => {
    const sql = 'SELECT * FROM stalls';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stalls');
        }
        res.render('aboutus', { stalls: results });
    });
});

app.get('/stalls/:id', function(req, res) {
    const stallId = req.params.id;
    const sql = 'SELECT * FROM stalls WHERE stallId = ?';
    connection.query(sql, [stallId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stall by ID');
        }
        if (results.length > 0) {
            res.render('stallInfo', { stall: results[0], stalls: results });
        } else {
            res.status(404).send('Stall not found');
        }
    });
});

app.get('/addstall', function(req, res) {
    const sql = 'SELECT * FROM stalls';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stalls');
        }
        res.render('addstall', { stalls: results });
    });
});

app.post('/stalls', upload.single('picture') ,function(req, res) {
    const {stallName, location, price ,cuisine ,halal ,currenttime} = req.body;
    let picture;
    if (req.file) {
        picture = req.file.filename;
    } else {
        picture = null;
    }

    const sql = 'INSERT INTO stalls (stallName, location, price, cuisine, halal, picture, currenttime) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [stallName, location, price, cuisine, halal, picture, currenttime ], (error, results) => {
        if (error) {
            console.error('Error adding stall:', error);
            res.status(500).send('Error adding stall');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/halal/:halal', (req, res) => {
    const halal = req.params.halal;
    const sql = 'SELECT * FROM stalls WHERE halal=?';
    connection.query(sql, [halal], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stalls');
        }
        res.render('halal', { stalls: results, halal: results });
    });
});

app.get('/location/:location', (req, res) => {
    const location = req.params.location;
    const sql = 'SELECT * FROM stalls WHERE location=?';
    connection.query(sql, [location], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stalls');
        }
        res.render('location', { stalls: results, stall_location: results, location: results });
    });
});

app.get('/cuisine/:cuisine', (req, res) => {
    const cuisine = req.params.cuisine;
    const sql = 'SELECT * FROM stalls WHERE cuisine=?';
    connection.query(sql, [cuisine], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stalls');
        }
        res.render('cuisine', { stalls: results, stall_cuisine: results, cuisine: results });
    });
});

app.get('/stalls/:id/update', function(req, res)  {
    const stallId = req.params.id;
    const sql = 'SELECT * FROM stalls WHERE stallId = ?';
    connection.query(sql, [stallId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving stall by ID');
        }
        if (results.length > 0) {
            res.render('updateStall', { updatestall: results[0], stalls: results });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.post('/stalls/:id/update', upload.single('picture') ,function(req, res) {
    const stallId = req.params.id;

    const {stallName, location, price ,cuisine ,halal ,currenttime} = req.body;
    let picture = req.body.currentPicture;
    if (req.file) {
        picture = req.file.filename;
    }
    const sql = 'UPDATE stalls SET stallName=?, location=?, price=?, cuisine=?, halal=?, currenttime=? , picture=? WHERE stallId = ?';
    connection.query(sql, [stallName, location, price, cuisine, halal, currenttime, picture, stallId], (error, results) => {
      if (error) {
        console.error("Error updating stall:", error);
        return res.status(500).send('Error updating stall');
      }
      res.redirect('/');
    });
  });

app.get('/stalls/:id/delete', function(req, res) {
    const stallId = req.params.id;
    const sql = 'DELETE FROM stalls WHERE stallId = ?';
    connection.query(sql, [stallId], (error, results) => {
      if (error) {
        console.error("Error deleting stall:", error);
        return res.status(500).send('Error deleting stall');
      }
      res.redirect('/');
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));