import express from 'express';

import getUserActivity from '../controllers/user/getUserActivity';
import addUserActivity from '../controllers/user/addUserActivity';
import setUserActivity from '../controllers/user/setUserActivity';
import deleteUserActivity from '../controllers/user/deleteUserActivity';

const app = express();
app.post('/addUserActivity', addUserActivity);
app.post('/setUserActivity', setUserActivity);
app.post('/getUserActivity', getUserActivity);
app.post('/deleteUserActivity', deleteUserActivity);


export default app;
