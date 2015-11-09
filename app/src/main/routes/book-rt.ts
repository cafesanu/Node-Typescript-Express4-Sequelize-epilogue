import {Router} from 'express';
import * as _ from 'lodash';

function routes(Book, resource: any) {
    var bookRouter: Router = Router(),
        bookCtrl = require('../controllers/book-ctrl')(Book, resource);

    bookRouter.route('/:id/sayHi')
        .get(bookCtrl.sayHi);

    return bookRouter;
}

export = routes;