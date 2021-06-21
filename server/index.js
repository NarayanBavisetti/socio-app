const express = require('express')

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req,res ) => {
    res.send("Hi bro!");
});

app.listen(PORT , () => console.log(`PORT is running at ${PORT}`))