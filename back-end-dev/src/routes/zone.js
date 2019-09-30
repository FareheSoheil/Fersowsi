import express from 'express';
import setZone from '../controllers/general/setZone';
import getZone from '../controllers/general/getZone';
import addZone from '../controllers/general/addZone';
import deleteZone from '../controllers/general/deleteZone';

const app = express();
app.post('/addzone', addZone);
app.post('/setzone', setZone);
app.post('/getzone', getZone);
app.post('/deleteZone', deleteZone);


export default app;
