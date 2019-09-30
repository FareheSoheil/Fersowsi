import express from 'express';
import addUserSubCategory from '../controllers/Product/addUserSubCategory';
import setUserSubCategory from '../controllers/Product/setUserSubCategory';
import getUserSubCategory from '../controllers/Product/getUserSubCategory';

const app = express();
app.post('/addUserSubCategory',addUserSubCategory);
app.post('/setUserSubCategory', setUserSubCategory);
app.post('/getUserSubCategory', getUserSubCategory);


export default app;
