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

// Setup middleware to do logging
app.use((req, res, next) => { // for all routes
    console.log(`${req.method} request for ${req.url}`);
    next(); // keep going
});

// Route for root 
app.get('/', (req, res) => {
    res.send('Hello world'); 
});

// Route to GET subject codes and descriptions -- #1
app.get('/api/courses', (req, res) => {
    const subjects = []; 
    for(i = 0; i < courseData.length; i++) {
         subjects.push({
             "subject": courseData[i].subject,
             "className": courseData[i].className
            });
    }
    res.send(subjects);
});

// PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
