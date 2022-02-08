import express from 'express';
import "reflect-metadata";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

export async function init() {
    const app = express();
    const port = 3000;

    // here createConnection will load connection options from
    // ormconfig.json / ormconfig.js / ormconfig.yml / ormconfig.env / ormconfig.xml
    // files, or from special environment variables
    try {
        await createConnection();
    } catch (e) {
        console.log(e);
        throw e;
    }

    // to handle cors, helmet to secure request, body parser to parse incoming json formatted payload
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.get('/healthcheck', (_, res) => {
        res.status(200).send('hello there!');
    });

    app.use('/', routes);

    app.listen(port, () => console.log(`Running on port ${port}`))
};

init();