import express from 'express';
import setAgeGroup from '../controllers/general/setAgeGroup';
import getAgeGroup from '../controllers/general/getAgeGroup';
import addAgeGroup from '../controllers/general/addAgeGroup';
import deleteAgeGroup from '../controllers/general/deleteAgeGroup';

const app = express();
app.post('/addAgeGroup',addAgeGroup);
app.post('/setAgeGroup', setAgeGroup);
app.post('/getAgeGroup', getAgeGroup);
app.post('/deleteAgeGroup', deleteAgeGroup);


export default app;
