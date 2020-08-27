import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';

import { baseRouter } from '@routes/';

const app = express();

//#region Middleware
app.use(cors());
app.use(bodyParser.json());
//#endregion

//#region Routes
app.use('/', baseRouter);
//#endregion

//#region Global error handling
app.use(<express.ErrorRequestHandler>((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
}));
//#endregion

config();
const { APP_PORT } = process.env;
app.listen(APP_PORT, () => {
    console.log(`server started on port ${APP_PORT}...`);
});
