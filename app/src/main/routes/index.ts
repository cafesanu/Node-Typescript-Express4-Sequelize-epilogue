import * as _ from 'lodash';
import * as _str from 'underscore.string';
import * as express from 'express';

export function modelsRouter(app: express.Express, models, epilogue) {
    _.forEach(models, (model, modelName: string) => {
        let fileName: string,
            resource,
            router,
            route;

        if (!_.includes(['sequelize', 'Sequelize'], modelName)) {
            fileName = _str.sprintf('./%s-rt', modelName.toLowerCase());
            route = require (fileName);
            resource = epilogue.resource({
                model: model,
                endpoints: [
                    _str.sprintf('/%ss', modelName.toLowerCase()),
                    _str.sprintf('/%ss/:id', modelName.toLowerCase())
                ]
            });
            router = route(model, resource);
            app.use(_str.sprintf('/api/%ss', modelName.toLowerCase()), router);
        }
    });
}
