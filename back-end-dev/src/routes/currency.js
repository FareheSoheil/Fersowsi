import express from 'express';
import setCurrency from '../controllers/general/setCurrency';
import addCurrency from '../controllers/general/addCurrency';
import getCurrency from '../controllers/general/getCurrency';
import deleteCurrency from '../controllers/general/deleteCurrency';

const app = express();
app.post('/addCurrency', addCurrency);
app.post('/setCurrency', setCurrency);
app.post('/getCurrency', getCurrency);
app.post('/deleteCurrency', deleteCurrency);

export default app;
