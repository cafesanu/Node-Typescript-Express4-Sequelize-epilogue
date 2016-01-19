/// <reference path='../../../typings/main.d.ts' />

import * as express from 'express';
import * as winston from 'winston';
import * as bodyParser from 'body-parser';
import * as models from './models';
import * as router from './routes';
import * as epilogue from 'epilogue';

const app: express.Express = express();
const port: number = process.env.PORT || 3000;

let allModels;

/*
 * Use middleware to convert post data into json.
 * It puts request into post/get/put/patch req.body parameter
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting up our singleton...
if (process.env.NODE_ENV === 'test') {
    allModels = models.modelCollector('hb_test', 'root', 'root', {
        dialect: 'mysql',
        host: 'virtualbox'
    });
} else if (process.env.NODE_ENV === 'development') {
    allModels = models.modelCollector('hb', 'root', 'root', {
        dialect: 'mysql',
        host: 'virtualbox'
    });

    allModels.sequelize.sync().then(() => {
        let server = app.listen(port, () => {
            let host: string = server.address().address;

            winston.log('info', 'listening at http://' + host + ':' + port);
        });
    });
}
// Create REST resource
epilogue.initialize({
    app: app,
    base: '/api',
    sequelize: allModels.sequelize
});

router.modelsRouter(app, allModels, epilogue);

app.get('/', (req, res) => {
    res.send('Honest Buildings api');
});

export = app;
