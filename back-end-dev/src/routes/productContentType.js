import express from 'express';
import setProductContentType from '../controllers/Product/getProductContentType';
import getProductContentType from '../controllers/Product/getProductContentType';
import addProductContentType from '../controllers/Product/addProductContentType';
import deleteProductContentType from '../controllers/Product/deleteProductContentType';

const app = express();
app.post('/addProductContentType', addProductContentType);
app.post('/setProductContentType', setProductContentType);
app.post('/getProductContentType', getProductContentType);
app.post('/deleteProductContentType', deleteProductContentType);


export default app;
