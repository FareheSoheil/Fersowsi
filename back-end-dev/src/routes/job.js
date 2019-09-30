import express from 'express';
import setJob from '../controllers/general/setJob';
import getJob from '../controllers/general/getJob';
import addJob from '../controllers/general/addJob';
import deleteJob from '../controllers/general/deleteJob';

const app = express();
app.post('/addJob', addJob);
app.post('/setJob', setJob);
app.post('/getJob', getJob);
app.post('/deleteJob', deleteJob);


export default app;
