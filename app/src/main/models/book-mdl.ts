function model(sequelize, dataTypes) {
    let Book = sequelize.define('Book', {
        title: {
            type: dataTypes.STRING
        },
        author: {
            type: dataTypes.STRING
        },
        genre: {
            type: dataTypes.STRING
        },
        read: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });

    return Book;
}

export = model;
