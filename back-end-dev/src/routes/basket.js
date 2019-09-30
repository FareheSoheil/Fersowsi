import express from 'express';
import getBasket from '../controllers/Order/getBasket';
import addBasket from '../controllers/Order/addBasket';
import setBasket from '../controllers/Order/setBasket';
import deletebasket from '../controllers/Order/deleteBasket';

const app = express();
app.post('/addBasket', addBasket);
app.post('/setBasket', setBasket);
app.post('/getBasket', getBasket);
app.post('/deleteBasket', deletebasket);


export default app;
