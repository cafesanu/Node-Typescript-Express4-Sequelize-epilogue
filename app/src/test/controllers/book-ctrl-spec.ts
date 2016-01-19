import * as _ from 'lodash';
import bookCtrl = require('../../main/controllers/book-ctrl');
let ForbiddenError = require('epilogue').Errors.ForbiddenError;

describe('Book Controller Tests', () => {
    let resource = {};

    describe('Custom endpoints', () => {
        beforeEach(() => {
            _.set(resource, 'delete.auth', () => {});
        });

        describe('customEndpoints', () => {
            it('should call custom endpoint', () => {
                let req = {},
                    res = {
                        status: jasmine.createSpy('customEndpoints status spy'),
                        send: jasmine.createSpy('customEndpoints send spy')
                    },
                    Book = {
                        build: () => {}
                    };

                bookCtrl(Book, resource).customEndpoint(req, res);

                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith('sup internet');
            });
        });
    });

    describe('epilogue endpoints', () => {
        let fnResource;
        beforeEach(() => {
            _.set(resource, 'delete.auth', (fn) => {
                fnResource = fn;
            });
        });

        describe('delete authentication', () => {
            it('should fail authentication', () => {
                let Book = {
                    build: () => {}
                };

                bookCtrl(Book, resource);
                expect(function() {
                    fnResource();
                }).toThrow(new ForbiddenError("can't delete a book"));
            });
        });
    });
});
