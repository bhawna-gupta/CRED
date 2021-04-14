const express = require("express");
const cors = require("cors");
const usersRoute =require('./routes/usersRoute.js');
const cardsRoute =require('./routes/cardsRoute');

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());

// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', usersRoute);
app.use('/', cardsRoute);
app.get('/',(req,res)=>{
    res.send("Hello From Backend");
});

const PORT =   process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


