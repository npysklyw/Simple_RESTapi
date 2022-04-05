const express = require('express');
let jobList = require('./jobs.json');

const app = express();

app.use(express.urlencoded({extended:true}))

//The app runs at port 2000
app.listen(2000);

//This is used to return jobs with a specific category specificed in them
app.get('/jobsCategory', (request, response) => {
    let content =[];
    
    //Convert the json to an array
    list = Object.values(jobList);


    //Iterate through the array
    //Push jobs with the specific requirement to the returning array
    for (j of list)
    {
        if (j.categories.includes(request.query.category)) {
            content.push(j)
        }
    }

    //Return content to the user
    response.send(content);
})

//Return jobs with a specific city to the user
app.get('/jobsCity', (request, response) => {
    let content =[];

    //Convert json data to an array
    list = Object.values(jobList)

    //Iterate through this array
    //Push jobs that contain the specific query city in them to an array
    for (j of list)
    {
        if (j.title.includes(request.query.city)) {
            content.push(j)
        }
    }

    //Return all the jobs to the user
    response.send(content);
})

//Return all the categories of jobs, with the occurences of each category attached
app.get('/jobsValues', (request, response) => {

    let cats = []
    
    //Get array of all the jobs
    list = Object.values(jobList)

    //Iterate through all the jobs
    for (j of list)
    {

        //Iterate through all categories per job
       for (c of j.categories) {

        //Save the current category
        let category = c;

        //If the main array contains the catgory, we increment the count by 1
        //Else we push a new object to the main array with the category
        if (cats.some(ca => ca.category === category)) {
            cats.find(ca => ca.category === category).value = cats.find(ca => ca.category === category).value + 1;
        }
        else {
            cats.push({"category":category, "value":1})
        }
        
     
            
       }
    }

    //Return the category, value to the user
    response.send(cats);
})

