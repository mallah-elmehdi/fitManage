// SET UP
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from './src/utils/env';
import athleteRouter from './src/routes/athleteRouter';
import assessmentRouter from './src/routes/assessmentRouter';
import medicalAndHealthHistoryRouter from './src/routes/medicalAndHealthHistoryRouter';
import exerciseRouter from './src/routes/exerciseRouter';
import error from './src/middlewares/errorHandler';

// APPLICATION
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use('/athlete', athleteRouter);
app.use('/assessment', assessmentRouter);
app.use('/medical-and-health-history', medicalAndHealthHistoryRouter);
app.use('/exercise', exerciseRouter);

// ERROR HANDLER
const { errorHandler } = error;
app.use(errorHandler);

// SERVER
app.listen(env.port, () => {
    console.log('all good bro ==> ' + env.port);
});
