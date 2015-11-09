_ = require('lodash');

describe('Book Controller Tests', function() {
    describe('Post', function() {
        it('should not allow empty title on post', function() {
            var req = {
                    body: {
                        author: 'Just me'
                    }
                },
                res = {
                    status: jasmine.createSpy(),
                    send: jasmine.createSpy()
                },
                Book = {
                    build: function() {}
                },
                bookCtrl = require('../../main/controllers/book-ctrl')(Book);

            bookCtrl.post(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Title is required');
        });
    });
});
