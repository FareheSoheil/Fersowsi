import express from 'express';
import addSiteLanguage from '../controllers/general/addSiteLanguage';
import setSiteLanguage from '../controllers/general/setSiteLanguage';
import getSiteLanguage from '../controllers/general/getSiteLanguage';

const app = express();
app.post('/addSiteLanguage',addSiteLanguage);
app.post('/setSiteLanguage', setSiteLanguage);
app.post('/getSiteLanguage', getSiteLanguage);


export default app;
