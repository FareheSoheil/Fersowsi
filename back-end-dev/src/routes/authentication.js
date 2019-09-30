import express from 'express';
import login from '../controllers/authentication/login';
import register from '../controllers/authentication/register';
// import confirmEmail from '../controllers/authentication/confirmEmail';
import sendResetPasswordEmail from '../controllers/authentication/sendResetPasswordEmail';
import sendConfirmationEmail from '../controllers/authentication/sendConfirmationEmail';
// import refreshToken from '../controllers/authentication/refreshToken';

const app = express();

app.post('/login', login);
app.post('/register', register);
// app.get('/verifyEmail/:token', confirmEmail);
app.post('/sendResetPasswordEmail', sendResetPasswordEmail);
// app.post('/resetPassword', resetPassword);
app.post('/sendConfirmationEmail', sendConfirmationEmail);

// app.post('/refreshToken', refreshToken);

export default app;
