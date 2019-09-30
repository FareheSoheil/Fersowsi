import express from 'express';
import setMessageStatus from '../controllers/messages/setMessageStatus';
import getMessageStatus from '../controllers/messages/getMessageStatus';
import addMessageStatus from '../controllers/messages/addMessageStatus';
import deleteMessageStatus from '../controllers/messages/deleteMessageStatus';

const app = express();
app.post('/addMessageStatus', addMessageStatus);
app.post('/setMessageStatus', setMessageStatus);
app.post('/getMessagestatus', getMessageStatus);
app.post('/deleteMessagestatus', deleteMessageStatus);


export default app;
