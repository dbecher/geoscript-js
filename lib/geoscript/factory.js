var util = require("geoscript/util");

var Factory = util.extend(Object, {

    constructor: function Factory(Type, config) {
        util.apply(this, config);
        this.Type = Type;
        this.type = Type.prototype.constructor.name;
    },
    
    handles: function(config) {
        return false;
    },
    
    create: function(config) {
        return new this.Type(config);
    }    

});

exports.Factory = Factory;