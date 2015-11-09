var request = require('supertest'),
    orm = require('../../main/helpers/model'),
    app = require('../../main/app.js'),
    Book = orm.model('Book'),
    agent = request.agent(app),
    bookId;

describe('Book Crud test', function() {
    it('Should allow a book to be poster and return a read and _id', function(done) {
        var bookPost = {
            title: 'carlos thought the',
            author: 'Carlangas',
            genre: 'History'
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(201)
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

    afterEach(function(done) {
        Book.destroy({
            where: {
                id: bookId
            }
        });
        done();
    });
});

