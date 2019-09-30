import express from 'express';
import setDeliveryType from '../controllers/general/setDeliveryType';
import getDeliverytype from '../controllers/general/getDeliveryType';
import addDeliveryType from '../controllers/general/addDeliveryType';
import deleteDeliveryType from '../controllers/general/deleteDeliveryType';

const app = express();
app.post('/adddeliveryType',addDeliveryType);
app.post('/setDeliveryType', setDeliveryType);
app.post('/getDeliveryType', getDeliverytype);
app.post('/deleteDeliveryType', deleteDeliveryType);


export default app;
