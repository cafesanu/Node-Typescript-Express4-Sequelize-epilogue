import {Router} from 'express';

function routes(Book, resource) {
    let bookRouter: Router = Router(),
        bookCtrl = require('../controllers/book-ctrl')(Book, resource);

    bookRouter.route('/:id/customEndpoint')
        .get(bookCtrl.customEndpoint);

    return bookRouter;
}

export = routes;
