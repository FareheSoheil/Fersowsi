import express from 'express';

import getLandingPage from '../controllers/Product/getLandingPage';
import addLandingPage from '../controllers/Product/addLandingPage';
import setLandingPage from '../controllers/Product/setLandingPage';
import deleteLandingPage from '../controllers/Product/deleteDeliveryLandingPage';

const app = express();
app.post('/addLandingPage', addLandingPage);
app.post('/setLandingPage', setLandingPage);
app.post('/getlandingPage', getLandingPage);
app.post('/deletelandingPage', deleteLandingPage);


export default app;
