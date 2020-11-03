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

// Route to GET all course codes for a given subject code -- #2
app.get('/api/courses/subjects/:subject', (req, res) => {
    const courseCode = [];
    for(i = 0; i < courseData.length; i++) {
        if (String(courseData[i].subject).includes(`${req.params.subject}`) && String(req.params.subject).length <= 15) {
            courseCode.push({
                "subject": courseData[i].subject,
                "className": courseData[i].className,
                "catalog_nbr": courseData[i].catalog_nbr,
                "course_info": courseData[i].course_info,
                "description": courseData[i].catalog_description
            });
        }
    }
    if (courseCode.length > 0) {
        res.send(courseCode);
    }
    // 404 subject code doesn't exist
    else {
        res.status(404).send('The courses with the given subject code were not found.');
    }
});

// PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
