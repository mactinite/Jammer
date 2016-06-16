var thinky = require('../util/thinky.js');
var type = thinky.type;
var User = thinky.createModel('User', {
    username: type.string(),
    local: type.object().schema({
        id: type.string(),
        name: type.string(),
        email: type.string(),
        profileImgURI: type.string(),
        password: type.string()
    }),
    github: type.object().schema({
        id: type.string(),
        token: type.string(),
        name: type.string(),
        profileImgURI: type.string(),
        email: type.string()
    })
});

module.exports = User;