import express from 'express';
import getCustomerOrder from '../controllers/Order/getCustomerOrder';
import addCustomerOrder from '../controllers/Order/addCustomerOrder';
import setCustomerOrder from '../controllers/Order/setCustomerOrder';
import deleteContactUs from '../controllers/messages/deleteContactUs';

const app = express();
app.post('/addCustomerOrder', addCustomerOrder);
app.post('/setCustomerOrder', setCustomerOrder);
app.post('/getCustomerOrder', getCustomerOrder);
app.post('/deleteCustomerOrder', deleteContactUs);


export default app;
