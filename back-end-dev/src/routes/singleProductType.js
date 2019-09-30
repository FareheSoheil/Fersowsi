import express from 'express';
import setSingleProductType from '../controllers/Product/setSingleProductType';
import getSingleProductType from '../controllers/Product/getSingleProductType';
import addSingleProductType from '../controllers/Product/addSingleProductType';
import deleteSingleProductType from '../controllers/Product/deleteSingleProductType';

const app = express();
app.post('/addSingleProductType', addSingleProductType);
app.post('/setSingleProductType', setSingleProductType);
app.post('/getSingleProductTyupe', getSingleProductType);
app.post('/deleteSingleProductTyupe', deleteSingleProductType);


export default app;
