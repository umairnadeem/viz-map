# Medical Data Visualization

Build a single page web application that illustrates the relative quality of care one might expect to receive in the US on a state-by-state basis by rendering a US Map data visualization based on real, current, medical data from the [Centers for Medicare & Medicaid Services' (CMS) Hospital Quality Initiative.](https://www.cms.gov/Medicare/Quality-Initiatives-Patient-Assessment-Instruments/HospitalQualityInits/HospitalCompare.html)

## Requirements:

To complete this assignment, you must complete the following steps:

###### API Integration
- Sign up for an account with [Data.Medicare.gov](https://data.medicare.gov/login) so that you can use the [*Hospital Compare* API](https://dev.socrata.com/foundry/data.medicare.gov/ukfj-tt6v).
- Create a configuration file similar to that in `config.example.js` called `config.js` to store your App Token.

###### Data Acquisition
- In `App.jsx`, send a GET request to the `/api/heartFailures` endpoint in your web server when the component mounts.
- In `server/index.js`, build out the request handler that responds to GET requests to your `/api/heartFailures` endpoint.  The request handler should send a request to the api to acquire all Complication and Death records in the current Hospital Compare *Complications and Deaths* database resource.
Make sure to include your app token in the headers of your request!

###### Data Wrangling/Munging
- The response from the `/api/heartFailures` endpoint should be formatted the same as in `client/src/dummyData.js`, which means you'll need to do some data wrangling!
- In particular, the request handler will have to:
    - Ensure the dataset only containes records that include the hospital's **30-Day Post-Discharge Mortality Rate** for patients who are treated at that hospital for **Heart Failure**.
    - Clean the dataset to remove all unnecessary data, such as the data associated with US Territories (AS, DC, GU, MP, PR, VI).
    - Process the dataset by determining the average score for each state.
        - There are many hospitals per state, and there will be one record for each hospital in a state.
        - To get a single Mortality Rate score for each state, you'll need to determine the average of all 30-Day Post-Discharge Mortality Rates across all hospitals in a given state, per state.
    - Reformat the data shape so that it is in an appropriate form to pass in to your client's data visualization component, `MapView.jsx`.

###### Data Visualization:

- Populate and render the US Map Data Visualization by passing the new, tidy dataset into the instance of the `MapView.jsx` component instantiated within `App.jsx` via `props`.
  

## Caveats:

###### Messy Data

- It will take some time to interpret the large, messy contents of the data returned in response to your API request.
  - Try making a few sample requests to get a look at the data format and values you'll be working with **before moving from Data Acquisition to Data Wrangling/Munging**. You can do this either: 
    - Directly in your application by outputting your data to the console for analysis.
    - With an API Development Environment platform such as [Postman](https://www.getpostman.com/).  (**Highly recommended.**)

- Some of the data is recorded with key/value pairs that are cryptic to outside consumers. You can Reference the [*Hospital Compare API Measures and current data collection periods*](https://www.medicare.gov/hospitalcompare/Data/Data-Updated.html#%20) docs to help you determine which records are relevant.
    - There are multiple datasets referenced here. Make sure to read from the appropriate table!
    - **Hint:** In relevant Mortality Rate records, the `score` property has a value representative of the 30-Day Post-Discharge Mortality Rate.

###### API Limitations
- This dataset contains over 90,000 records.
- The maximum number of records that can be returned per request is 50,000.
- Of the 90,000 records available, just below 4,000 of them are relevant to the 30-Day Post-Discharge Mortality Rate of patients who were treated for Heart Failure.
  -The relevant records are randomly distributed throughout the dataset.  (They are in no particular order.)
- You'll have to come up a strategy to ensure you get all of the relevant data.

## Available Resources:

- [MDN](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [Postman](https://www.getpostman.com/)
- [Hopsital Compare: Complications and Deaths API Docs](https://dev.socrata.com/foundry/data.medicare.gov/ukfj-tt6v)
- [SODA Developers API Docs: Simple Filtering](https://dev.socrata.com/docs/filtering.html)
- [SODA Developers API Docs: Paging Through Data](https://dev.socrata.com/docs/paging.html#2.1)
- [NPM: Axios](https://www.npmjs.com/package/axios)
- [NPM: Request](https://www.npmjs.com/package/request)
- [NPM: DataMaps](https://www.npmjs.com/package/datamaps)
- [DataMaps Examples](http://datamaps.github.io/)