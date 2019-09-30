import express from 'express';
import setProductLanguage from '../controllers/general/setProductLanguage';
import getProductLanguage from '../controllers/general/getProductLanguage';
import addProductLanguage from '../controllers/general/addProductLanguage';


const app = express();
app.post('/addProductLanguage', addProductLanguage);
app.post('/setproductLanguage', setProductLanguage);
app.post('/getProductLanguage', getProductLanguage);

export default app;
