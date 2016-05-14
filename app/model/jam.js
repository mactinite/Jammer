var thinky = require(__dirname+'/util/thinky.js');
var type = thinky.type;
var Jam = thinky.createModel('Jam', {
    
    startDate: type.date(),
    endDate: type.date(),
    name: type.string(),
    imageURL: type.string(),
    inProgress: type.boolean()
    
});

module.exports = Jam;