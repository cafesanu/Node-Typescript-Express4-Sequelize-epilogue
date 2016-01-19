import * as fs from 'fs';
import {join} from 'path';
import * as _ from 'lodash';

let db = {};

export function modelCollector(database: string, username: string, password: string, obj: Object) {
    let Sequelize = require('sequelize'),
        sequelize = new Sequelize(database, username, password, obj);

    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(function(file) {
            let model = sequelize.import(join(__dirname, file));

            db[model.name] = model;
        });

    _.forEach(db, function(model) {
        if (model.options.hasOwnProperty('associate')) {
            model.options.associate(db);
        }
    });

    return _.assign({
        sequelize: sequelize,
        Sequelize: Sequelize
    }, db);
}

