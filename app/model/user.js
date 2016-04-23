var thinky = require(__dirname+'/util/thinky.js');
var type = thinky.type;
var User = thinky.createModel('User', {
    
    local: type.object.schema({
        email: type.string(),
        password: type.string()
    }),
    github: type.object.schema({
        id: type.string(),
        token: type.string(),
        name: type.string(),
        email: type.string()
    })
    
    
});

module.exports = User;