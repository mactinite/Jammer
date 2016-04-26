'use strict';

const schema = 'Jammer';

module.exports = {

    connect: function () {
        const r = require('rethinkdb');
        return (r.connect({ db: schema }));
    },
    
    host: 'localhost',
    port: 28015,
    schema: schema,
    table: {
        jam: "Jam",
        user: "User"
    }


};