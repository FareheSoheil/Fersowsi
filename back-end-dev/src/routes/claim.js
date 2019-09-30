import express from 'express';
import addClaim from '../controllers/messages/addClaim';
import setClaim from '../controllers/messages/setClaim';
import getClaim from '../controllers/messages/getClaim';
import deleteClaim from '../controllers/messages/deleteClaim';

const app = express();
app.post('/addClaim', addClaim);
app.post('/setClaim', setClaim);
app.post('/getClaim', getClaim);
app.post('/deleteClaim', deleteClaim);


export default app;
