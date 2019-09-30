import express from 'express';

import addProduct from '../controllers/Product/addProduct';
import setProduct from '../controllers/Product/setProduct';
import getProduct from '../controllers/Product/getProduct';
import deleteProduct from '../controllers/Product/deleteProduct';

const app = express();
app.post('/addProduct', addProduct);
app.post('/setProduct', setProduct);
app.post('/getProduct', getProduct);
app.post('/deleteProduct', deleteProduct);


export default app;
