/// <reference path='../../../typings/tsd.d.ts' />

import * as express from 'express';
import * as bodyParser from 'body-parser';
import models = require('./models');
import router = require('./routes');
var epilogue = require('epilogue');

const app: express.Express = express();
const port: number = process.env.PORT || 3000;

var allModels;

/*
 * Use middleware to convert post data into json.
 * It puts request into post/get/put/patch req.body parameter
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting up our singleton...
if (process.env.NODE_ENV === 'test') {
    allModels = models.modelCollector('hb_test', 'root', 'root', {
        host: 'virtualbox',
        dialect: 'mysql'
    });
} else if (process.env.NODE_ENV === 'development') {
    allModels = models.modelCollector('hb', 'root', 'root', {
        host: 'virtualbox',
        dialect: 'mysql'
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
    res.send('Welcome to my api');
});

allModels.sequelize.sync().then(() => {
    var server = app.listen(port, () => {
        var host: string = server.address().address,
            port: number = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });
});

export default app;
