import * as request from 'supertest';
import allModels = require('../../main/models');
import app = require('../../main/app');
import httpStatusCodes = require('../../main/constants/http-codes-const');

let agent = request.agent(app),
    bookStr = 'Book',
    orm = allModels.modelCollector('hb_test', 'root', 'root', {
        host: 'virtualbox',
        dialect: 'mysql'
    }),
    Book = orm[bookStr],
    bookId;

describe('Book Crud test', () => {
    it('Should allow a book to be poster and return a read and _id', (done) => {
        let bookPost = {
            title: 'carlos thought the',
            author: 'Carlangas',
            genre: 'History'
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(httpStatusCodes.SUCCESS_2XX.CREATED)
            .end(function(err, results) {
                bookId = results.body.id;
                expect(results.body.read).toEqual(false);
                expect(bookId).toBeDefined();
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });

    afterEach((callback) => {
        Book.destroy({
            where: {
                id: bookId
            }
        }).then(() => {
            callback();
        });
    });
});
