let ForbiddenError = require('epilogue').Errors.ForbiddenError;

function bookCtrl(Book, bookResource) {
    bookResource.delete.auth((req, res, context) => {
        throw new ForbiddenError("can't delete a book");
    });

    function customEndpoint(req, res) {
        res.status(200);
        res.send('sup internet');
    }

    function notTestedEndpoint(req, res) {
        res.status(200);
        res.send('sup internet you need to test me');
    }

    return {
        customEndpoint: customEndpoint,
        notTestedEndpoint: notTestedEndpoint
    };
}

export = bookCtrl;
