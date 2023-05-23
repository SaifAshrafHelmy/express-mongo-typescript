"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logger_1 = __importDefault(require("./library/Logger"));
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const router = (0, express_1.default)();
/* connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logger_1.default.info('connected to MongoDB successfully');
    StartServer();
})
    .catch((error) => {
    Logger_1.default.error(`Unable to connect to mongoDB`);
    Logger_1.default.error(error);
});
/* only start the server if Mongo connects */
const StartServer = () => {
    router.use((req, res, next) => {
        /* Log the request */
        Logger_1.default.info(`Incoming <- Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /* Log the response  */
            Logger_1.default.info(`Outgoing ->>> Method [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
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
    router.use('/authors', Author_1.default);
    router.use('/books', Book_1.default);
    /* Health check */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    /* Error Handling */
    router.use((req, res, next) => {
        const error = new Error('Path not found');
        Logger_1.default.error(error);
        res.status(404).json({ message: `${error.message}` });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        Logger_1.default.info(`Server is running on port ${config_1.config.server.port}`);
    });
};
