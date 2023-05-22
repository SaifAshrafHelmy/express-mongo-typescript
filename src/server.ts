import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';

const router = express();

/* connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to MongoDB successfully');
        StartServer();
    })
    .catch((error) => {
        Logging.error(`Unable to connect to mongoDB`);
        Logging.error(error);
    });

/* only start the server if Mongo connects */
const StartServer = () => {
    router.use((req, res, next) => {
        /* Log the request */
        Logging.info(`Incoming <- Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /* Log the response  */

            Logging.info(`Outgoing ->>> Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /* Rules of the API */
    router.use((req, res, next) => {
        // requests can come from anywhere
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /* Routes */

    /* Health check */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /* Error Handling */
    router.use((req, res, next) => {
        const error = new Error('Path not found');
        Logging.error(error);
        res.status(404).json({ message: `${error.message}` });
    });

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
};
