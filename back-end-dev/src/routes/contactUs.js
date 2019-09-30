import express from 'express';

import addContactUs from '../controllers/messages/addContactUs';
import setContactUs from '../controllers/messages/setContactUs';
import getContactUs from '../controllers/messages/getContactUs';
import deleteContactUs from '../controllers/messages/deleteContactUs';

const app = express();
app.post('/addContactUs', addContactUs);
app.post('/setContactUs', setContactUs);
app.post('/getContactUs', getContactUs);
app.post('/deleteContactUs', deleteContactUs);


export default app;
