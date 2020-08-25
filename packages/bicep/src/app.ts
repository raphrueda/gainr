import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';

import { baseRouter } from './routes/routes';

config();
const { APP_PORT } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/', baseRouter);
app.use((err, req, res, next) => res.status(err.status || 500).send(err.message));

app.listen(APP_PORT, () => {
    console.log(`server started on port ${APP_PORT}...`);
});
