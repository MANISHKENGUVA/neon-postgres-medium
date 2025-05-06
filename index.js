const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const { Pool } = require("pg");

app.use(cors());
app.use(express.json());
const {PGHOST,PGDATABASE,PGUSER,PGPASSWORD} = process.env;
const pool = new Pool({
      host:PGHOST,
      database:PGDATABASE,
      username:PGUSER,
      password:PGPASSWORD,
      port: 5432, //default port of the neon postgres
      ssl:{
        require:true,
       }
})

app.get('/', async (req, res) => {
    const client = await pool.connect();
    try {
        // connection logic
        const result = await pool.query("SELECT * FROM posts");
        res.json(result.rows);
    }
    catch (errors) {
        console.log(errors)
    }
    finally{
        client.release();
    } 

});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));



// const express = require('express');
// const { resolve } = require('path');

// const app = express();
// const port = 3010;

// app.use(express.static('static'));


//  const result = await pool.query("SELECT * FROM posts");
// const result = await pool.query("INSERT INTO posts (id, title, description) VALUES  (9, 'nine  Post', 'Description nine post')");

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// app.listen(3001, () => console.log("Server Running on port 3001"));

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

