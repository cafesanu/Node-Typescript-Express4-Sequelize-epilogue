import * as fs from 'fs';
import {join} from 'path';
import * as _ from 'lodash';

var db = {};

export function modelCollector(database: string, username: string, password: string, obj: Object) {
    var Sequelize = require('sequelize'),
        sequelize = new Sequelize(database, username, password, obj);

    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(function(file) {
            var model = sequelize.import(join(__dirname, file));

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

