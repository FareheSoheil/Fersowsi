import express from 'express';
import addAddress from '../controllers/general/addAddress';
import setAddress from '../controllers/general/setAddress';
import getAddress from '../controllers/general/getAddress';
import deleteAddress from '../controllers/general/deleteAddress';

const app = express();
app.post('/addAddress',addAddress);
app.post('/setAddress', setAddress);
app.post('/getAddress',getAddress );
app.post('/deleteAddress', deleteAddress);

export default app;
