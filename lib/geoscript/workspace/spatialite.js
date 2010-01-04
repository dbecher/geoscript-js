var Workspace = require("geoscript/workspace/workspace").Workspace;
var util = require("geoscript/util");
var SpatiaLiteDataStoreFactory = Packages.org.geotools.data.spatialite.SpatiaLiteDataStoreFactory;

/** api: (define)
 *  module = workspace
 *  class = SpatiaLite
 */

var prepConfig = function(config) {
    if (!(typeof config.database === "string" || config.database instanceof file.Path)) {
        throw "SpatiaLite config must include database path.";
    }
    return {
        database: String(config.database)
    };
};

/** api: (extends)
 *  workspace/workspace.js
 */
var SpatiaLite = util.extend(Workspace, {
    
    /** api: constructor
     *  .. class:: SpatiaLite
     *
     *      Create a workspace from a SpatiaLite enabled database.
     */
    constructor: function SpatiaLite(config) {
        Workspace.prototype.constructor.apply(this, [prepConfig(config)]);
    },
    
    /** private: method[_create]
     *  :arg config: ``Object``
     *  :returns: ``org.geotools.jdbc.JDBCDataStore``
     *
     *  Create the underlying store for the workspace.
     */
    _create: function(config) {
        config.dbtype = "spatialite";
        var factory = new SpatiaLiteDataStoreFactory();
        return factory.createDataStore(config);
    },

    /** private: property[config]
     */
    get config() {
        return {
            type: this.constructor.name,
            database: this.database
        };
    }
    
});

exports.SpatiaLite = SpatiaLite;

// register a spatialite factory for the module
var workspace = require("geoscript/workspace");
var Factory = require("geoscript/factory").Factory;

workspace.register(new Factory(SpatiaLite, {
    handles: function(config) {
        var capable = false;
        if (typeof config.type === "string" && config.type.toLowerCase() === "spatialite") {
            try {
                config = prepConfig(config);
                capable = true;
            } catch (err) {
                // pass
            }            
        }
        return capable;
    }
}));