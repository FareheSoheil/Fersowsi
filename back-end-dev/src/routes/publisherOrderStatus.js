import express from 'express';
import setPublisherOrderStatus from '../controllers/Order/setPublisherOrderStatus';
import getPublisherOrderStatus from '../controllers/Order/getPublisherOrderStatus';
import addPublisherOrderStatus from '../controllers/Order/addPublisherOrderStatus';
import deletePublisherOrderStatus from '../controllers/Order/deletePublisherOrderStatus';

const app = express();
app.post('/addPublisherOrderStatus', addPublisherOrderStatus);
app.post('/setPublisherOrderStatus', setPublisherOrderStatus);
app.post('/getPublisherOrderStatus', getPublisherOrderStatus);
app.post('/deletePublisherOrderStatus', deletePublisherOrderStatus);


export default app;
