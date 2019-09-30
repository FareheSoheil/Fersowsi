import express from 'express';

import addInvoice from '../controllers/Order/addInvoice';
import setInvoice from '../controllers/Order/setInvoice';
import getInvoice from '../controllers/Order/getInvoice';
import deleteInvoice from '../controllers/Order/deleteInvoice';

const app = express();
app.post('/addInvoice', addInvoice);
app.post('/setInvoice', setInvoice);
app.post('/getInvoice', getInvoice);
app.post('/deleteInvoice', deleteInvoice);


export default app;
