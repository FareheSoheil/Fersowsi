import express from 'express';
import setCustomerOrderStatus from '../controllers/Order/setCustomerOrderStatus';
import getCustomerOrderStatus from '../controllers/Order/getCustomerOrderStatus';
import addCustomerOrderStatus from '../controllers/Order/addCustomerOrderStatus';
import deleteCustomerOrderStatus from '../controllers/Order/deleteCustomerOrderStatus';

const app = express();
app.post('/addCustomerOrderStatus', addCustomerOrderStatus);
app.post('/setCustomerOrderStatus', setCustomerOrderStatus);
app.post('/getCustomerOrderStatus', getCustomerOrderStatus);
app.post('/deleteCustomerOrderStatus', deleteCustomerOrderStatus);


export default app;
