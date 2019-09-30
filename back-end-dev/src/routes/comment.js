import express from 'express';
import addComment from '../controllers/messages/addComment';
import setComment from '../controllers/messages/setComment';
import getComment from '../controllers/messages/getComment';
import deleteComment from '../controllers/messages/deleteComment';

const app = express();
app.post('/addComment', addComment);
app.post('/setComment', setComment);
app.post('/getComment', getComment);
app.post('/deleteComment', deleteComment);


export default app;
