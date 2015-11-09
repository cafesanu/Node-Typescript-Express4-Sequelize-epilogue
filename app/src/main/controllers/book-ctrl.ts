function bookCtrl(Book, bookResource) {
    function sayHi(req, res) {
        res.send('sup internet');
    }

    return {
        sayHi: sayHi
    };
}

export = bookCtrl;
