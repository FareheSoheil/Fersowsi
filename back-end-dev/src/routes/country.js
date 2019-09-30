import express from 'express';
import getcountry from '../controllers/general/getCountry';
import setcountry from '../controllers/general/setCountry';
import addCountry from '../controllers/general/addCountry';
import deleteCountry from '../controllers/general/deleteCountry';


const app = express();
app.post('/addcountry', addCountry);
app.post('/setcountry', setcountry);
app.post('/getAllCountries', getcountry);
app.post('/deleteCountry', deleteCountry);

export default app;
