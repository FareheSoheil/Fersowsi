import express from 'express';
import getProductContentTranslation from '../controllers/Product/getProductContentTranslation';
import addProductContentTranslation from '../controllers/Product/addProductContentTranslation';
import setProductContentTranslation from '../controllers/Product/setProductContentTranslation';
import deleteProductContentTranslation from '../controllers/Product/deleteProductContentTranslation';

const app = express();
app.post('/addProductContentTranslation', addProductContentTranslation);
app.post('/setProductContentTranslation', setProductContentTranslation);
app.post('/getProductContentTranslation', getProductContentTranslation);
app.post('/deleteProductContentTranslation', deleteProductContentTranslation);

export default app;
