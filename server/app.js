const express = require('express');
const app = express();
const cors = require('cors');

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// To get all users data 
app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

// To get all interviews data
app.get('/getAllInterviews', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllInterviewData();
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})


// delete an interview
app.delete('/deleteInterview/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteInterviewById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// Insert new interview in table 
app.post('/insertInterview', (request, response) => {
    const { email1, email2, endTime, startTime } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertInterview(email1, email2, startTime, endTime);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// Update interview
app.patch('/updateInterview', (request, response) => {
    const { id, email1, email2, startTime, endTime } = request.body;
    const db = dbService.getDbServiceInstance();
    //console.log("route",id,startTime,endTime);
    const result = db.updateInterviewById(id, email1, email2, startTime, endTime);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.listen(5000, () => console.log('Jai shree ram!'));