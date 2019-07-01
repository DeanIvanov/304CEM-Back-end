const fs = require('fs');
const express = require('express');
const app = express();
//Enable JSON in express
app.use(express.json());

var ads = [];

//Route for getting all data from the array
app.get('/api/ads', (req, res) => {
    var rawData = fs.readFileSync('array.json');
    var ads = JSON.parse(rawData); 

    res.send(ads);
});

//Route for obtaining(getting) an ad from the array from a GET request using its unique id
app.get('/api/ads/:id', (req, res) => {
    var rawData = fs.readFileSync('array.json');
    var ads = JSON.parse(rawData); 

    //Checking if ad id exists in the array and returning a 404 error if missing
    let ad = ads.find(a => a.id === parseInt(req.params.id));
    if (!ad) { 
        res.status(404).send("This ad was not found.");
        return; 
    }
    res.send(ad);
});

//Route for adding(posting) a new ad to the array from a JSON format POST request
//Also includes basic validation for the input fields
app.post('/api/ads', (req, res) => {
    var rawData = fs.readFileSync('array.json');
    var ads = JSON.parse(rawData);

    if (!req.body.title || req.body.title.length < 5) {
        //400 Bad Request if field is empty or under 5 characters
        res.status(400).send("Please select a title with at least 5 characters for your ad.");
        return; 
    } if (!req.body.price) {
        //400 Bad Request if field is empty
        res.status(400).send("Please insert a price for your ad.");
        return; 

    } if (!req.body.condition || req.body.condition.length < 3) {
        //400 Bad Request if field is empty or under 3 characters
        res.status(400).send("Please describe the condition of your item with at least 3 characters.");
        return; 

    } if (!req.body.city || req.body.city.length < 3) {
        //400 Bad Request if field is empty of under 3 characters
        res.status(400).send("Please select the name of the city the ad is for.");
        return; 

    } if (!req.body.features || req.body.features.length < 10) {
        //400 Bad Request if field is empty or under 10 characters
        res.status(400).send("Please describe the features of the product in your ad.");
        return; 

    } if (!req.body.description || req.body.description.length < 10) {
        //400 Bad Request if field is empty or under 10 characters
        res.status(400).send("Please insert a short description for your advetrisement.");
        return; 

    }

    //Add all validated data into an array used to push the data into the orignal array while keeping id unique
    const ad = {
        id: ads.length + 1,
        title: req.body.title,
        price: req.body.price,
        condition: req.body.condition,
        city: req.body.city,
        features: req.body.features,
        description: req.body.description
    };
    ads.push(ad);
    var readyAd = JSON.stringify(ads, null, 4);
    fs.writeFile('array.json', readyAd, done);
    function done() {}
    res.send(ad);
});


//Route for updating(putting) an ad from a JSON format PUT request
//Also includes basic validation for the input fields
app.put('/api/ads/:id', (req, res) => {
    var rawData = fs.readFileSync('array.json');
    var ads = JSON.parse(rawData);

    //Checking if ad id exists in the array and returning a 404 error if missing
    let ad = ads.find(a => a.id === parseInt(req.params.id));
    if (!ad) {
        res.status(404).send("This ad was not found.");
        return; 
    }

    if (!req.body.title || req.body.title.length < 5) {
        //400 Bad Request if field is empty or under 5 characters
        res.status(400).send("Please select a title with at least 5 characters for your ad.");
        return; 
    } if (!req.body.price) {
        //400 Bad Request if field is empty
        res.status(400).send("Please insert a price for your ad.");
        return; 

    } if (!req.body.condition || req.body.condition.length < 3) {
        //400 Bad Request if field is empty or under 3 characters
        res.status(400).send("Please describe the condition of your item with at least 3 characters.");
        return; 

    } if (!req.body.city || req.body.city.length < 3) {
        //400 Bad Request if field is empty of under 3 characters
        res.status(400).send("Please select the name of the city the ad is for.");
        return; 

    } if (!req.body.features || req.body.features.length < 10) {
        //400 Bad Request if field is empty or under 10 characters
        res.status(400).send("Please describe the features of the product in your ad.");
        return; 

    } if (!req.body.description || req.body.description.length < 10) {
        //400 Bad Request if field is empty or under 10 characters
        res.status(400).send("Please insert a short description for your advetrisement.");
        return; 

    }

    ad.title = req.body.title;
    ad.price = req.body.price;
    ad.condition = req.body.condition;
    ad.city= req.body.city;
    ad.features = req.body.features;
    ad.description = req.body.description;

    const index = ads.indexOf(ad);
    ads.splice(index, 1);
    ads.push(ad);
    var readyAd = JSON.stringify(ads, null, 4);
    fs.writeFile('array.json', readyAd, done);
    function done() {}
    res.send(ad);
});

//Route for removing(deleting) an ad from the array from a DELETE request
app.delete('/api/ads/:id', (req, res) => {
    var rawData = fs.readFileSync('array.json');
    var ads = JSON.parse(rawData);
    
    //Checking if ad id exists in the array and returning a 404 error if missing
    let ad = ads.find(a => a.id === parseInt(req.params.id));
    if (!ad) {
        res.status(404).send("This ad was not found.");
        return;
    }

    const index = ads.indexOf(ad);
    ads.splice(index, 1);
    var readyAd = JSON.stringify(ads, null, 4);
    fs.writeFile('array.json', readyAd, done);
    function done() {}
    res.send(ad);
});



//Attempt to get the port. If unsuccessful, use port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Currently using port ${port}...`));