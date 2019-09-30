import express from 'express';
import setProductPeriod from '../controllers/Product/setProductPeriod';
import getProductPeriod from '../controllers/Product/getProductPeriod';
import addProductPeriod from '../controllers/Product/addProductPeriod';
import deleteProductPeriod from '../controllers/Product/deleteProductPeriod';

const app = express();
app.post('/addProductPeriod', addProductPeriod);
app.post('/setProductPeriod', setProductPeriod);
app.post('/getProductPeriod', getProductPeriod);
app.post('/deleteProductPeriod', deleteProductPeriod);


export default app;
