import express from 'express';

import getProductContentCategory from '../controllers/Product/getProductContentCategory';
import deleteProductContentCategory from '../controllers/Product/deleteProductContentCategory';
import addProductContentCategory from '../controllers/Product/addProductContentCategory';
import setProductContentCategory from '../controllers/Product/setProductContentCategory';

const app = express();
app.post('/addProductContentCategory', addProductContentCategory);
app.post('/setProductContentCategory', setProductContentCategory);
app.post('/getProductContentCategory', getProductContentCategory);
app.post('/deleteProductContentCategory', deleteProductContentCategory);


export default app;
