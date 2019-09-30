import express from 'express';

import addProductPeriodPrice from '../controllers/Product/addProductPeriodPrice';
import setProductPeriodPrice from '../controllers/Product/setProductPeriodPrice';
import getProductPeriodPrice from '../controllers/Product/getProductPeriodPrice';
import deleteProductPeriodPrice from '../controllers/Product/deleteProductPeriodPrice';

const app = express();
app.post('/addProductPeriodPrice', addProductPeriodPrice);
app.post('/setProductPeriodPrice', setProductPeriodPrice);
app.post('/getProductPeriodPrice', getProductPeriodPrice);
app.post('/deleteProductPeriodPrice', deleteProductPeriodPrice);


export default app;
