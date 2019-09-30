import express from 'express';
import getDeliveryPrice from '../controllers/Product/getDeliveryPrice';
import addDeliveryPrice from '../controllers/Product/addDeliveryPrice';
import setDeliveryPrice from '../controllers/Product/setDeliveryPrice';
import deleteDeliveryPrice from '../controllers/Product/deleteDeliveryPrice';

const app = express();
app.post('/addDeliveryPrice', addDeliveryPrice);
app.post('/setDeliveryPrice', setDeliveryPrice);
app.post('/getdeliveryPrice', getDeliveryPrice);
app.post('/deleteDeliveryPrice', deleteDeliveryPrice);


export default app;
