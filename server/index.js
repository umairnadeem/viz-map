const express = require('express');
const config = require('../config');
const request = require('request');


const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../client/dist'));

// ----------------------------------------------------
// TODO: Fill in the request handler for this endpoint!
// ----------------------------------------------------
app.get('/api/heartFailures', (req, res) => { 
  // ----------------------------------------------------
  // TODO: Fill in the request handler for this endpoint!
  // ----------------------------------------------------

  console.log(config.DATA_MEDICARE_GOV_APP_TOKEN)
  let options = {
    url: "https://data.medicare.gov/resource/ukfj-tt6v.json?$where=location_state not in('AS', 'DC', 'GU', 'MP', 'PR', 'VI')&measure_name=Death rate for heart failure patients",
    type: "GET",
    headers: {
      "Accept": "application/json",
      "X-App-Token" : config.DATA_MEDICARE_GOV_APP_TOKEN
    },
  };

  const callback = (err, response, body) => {
    if (err) {
      return console.error(err);
    }
    let data = JSON.parse(body);
    let extracted = data.reduce((accum, elem) => {
      if (accum[elem.state]) {
        if (accum[elem.state]["mortalityScore"]) {
          accum[elem.state]["mortalityScore"] += parseInt(elem.score) || 0;
          accum[elem.state]["count"] += 1;
        }
      } else {
        accum[elem.state] = {};
        accum[elem.state]["mortalityScore"] = parseInt(elem.score) || 0;
        accum[elem.state]["count"] = 1;
      }
      return accum;
    }, {});
    for (let key in extracted) {
      extracted[key]["mortalityScore"] = (extracted[key]["mortalityScore"] / extracted[key]["count"]).toFixed(2);
      delete extracted[key]["count"]; 
    }
    console.log(extracted);
    res.send(extracted);
  };

  request(options, callback);
    // -----------------------------------------------------
    // TODO: Send a request to the HospitalCompare API here!
    // -----------------------------------------------------

    // -----------------------------------------------------
    // TODO: Do all data processing/wrangling/munging here!
    // -----------------------------------------------------

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});