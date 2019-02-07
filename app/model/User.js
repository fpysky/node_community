'use strict';

module.exports = app => {
    const {STRING, INTEGER} = app.Sequelize;

    const User = app.model.define('users', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        nickname: INTEGER,
        account: STRING,
        phone_number: INTEGER,
        password: STRING
    });

    return User;
};