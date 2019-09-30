import express from 'express';

import getPublisherOrder from '../controllers/Order/getPublisherOrder';
import addPublisherOrder from '../controllers/Order/addPublisherOrder';
import setPublisherOrder from '../controllers/Order/setPublisherOrder';
import deletePublisherOrder from '../controllers/Order/deletePublisherOrder';

const app = express();
app.post('/addPublisherOrder', addPublisherOrder);
app.post('/setPublisherOrder', setPublisherOrder);
app.post('/getPublisherOrder', getPublisherOrder);
app.post('/deletePublisherOrder', deletePublisherOrder);

export default app;
