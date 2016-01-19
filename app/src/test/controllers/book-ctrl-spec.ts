import * as _ from 'lodash';
import bookCtrl = require('../../main/controllers/book-ctrl');
var ForbiddenError = require('epilogue').Errors.ForbiddenError;

describe('Book Controller Tests', () => {
    var resource = {};

    describe('Custom endpoints', () => {
        beforeEach(() => {
            _.set(resource, 'delete.auth', () => {});
        });

        describe('customEndpoints', () => {
            it('should call custom endpoint', () => {
                var req = {},
                    res = {
                        status: jasmine.createSpy('customEndpoints status spy'),
                        send: jasmine.createSpy('customEndpoints send spy')
                    },
                    Book = {
                        build: () => {}
                    },
                    bookCtrl = require('../../main/controllers/book-ctrl')(Book, resource);

                bookCtrl.customEndpoint(req, res);

                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith('sup internet');
            });
        });
    });

    describe('epilogue endpoints', () => {
        var fnResource;
        beforeEach(() => {
            _.set(resource, 'delete.auth', (fn) => {
                fnResource = fn;
            });
        });

        describe('delete authentication', () => {
            it('should fail authentication', () => {
                var Book = {
                        build: () => {}
                    },
                    bookCtrl = require('../../main/controllers/book-ctrl')(Book, resource);

                expect(function() {
                    fnResource()
                }).toThrow(new ForbiddenError("can't delete a book"));
            });
        });
    });
});
