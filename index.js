const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//Function to parse JSON file
function parsingFunction (datafile) {
    const file = require('./' + datafile);
    return file;
}

const courseData = parsingFunction('Lab3-timetable-data.json'); 

// Setup serving front-end code
app.use('/', express.static('static'));


// Route for root 
app.get('/', (req, res) => {
    res.send('Hello world'); 
});




// PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
