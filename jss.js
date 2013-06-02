var _ = require('underscore');

function units(unit) {
    if (_.isString(unit)) {
        return unit;
    } else {
        return unit + 'px';
    }
}

function color(clr) {
    if (_.isString(clr)) {
        return clr;
    } else if (_.isArray(clr)) {
        if (clr.length == 3) {
            return 'rgb(' + clr.join(', ') + ')';
        } else if (clr.length == 4) {
            return 'rgba(' + clr.join(', ') + ')';
        }
    }
}

function isPlainObject(obj) {
    return obj.constructor === Object;
}

var processors = {
    text: {
        color: function(val) {
            return {
                'color': color(val)
            };
        },

        align: {
            horizontal: function(val) {
                return {
                    'text-align': val
                };
            },

            vertical: function(val) {
                return {
                    'vertical-align': val
                };
            },
        }
    },

    background: {
        color: function(val) {
            return {
                'background-color': color(val)
            };
        },
    },

    padding: {
        scalar: function(val) {
            return {
                'padding': units(val)
            };
        },

        horizontal: function(val) {
            return {
                'padding-left': units(val),
                'padding-right': units(val),
            };
        },

        vertical: function(val) {
            return {
                'padding-top': units(val),
                'padding-bottom': units(val),
            };
        },

        left: function(val) {
            return {
                'padding-left': units(val)
            };
        },

        right: function(val) {
            return {
                'padding-right': units(val)
            };
        },

        top: function(val) {
            return {
                'padding-top': units(val)
            };
        },

        bottom: function(val) {
            return {
                'padding-bottom': units(val)
            };
        },
    },

    margin: {
        scalar: function(val) {
            return {
                'margin': units(val)
            };
        },

        horizontal: function(val) {
            return {
                'margin-left': units(val),
                'margin-right': units(val),
            };
        },

        vertical: function(val) {
            return {
                'margin-top': units(val),
                'margin-bottom': units(val),
            };
        },

        left: function(val) {
            return {
                'margin-left': units(val)
            };
        },

        right: function(val) {
            return {
                'margin-right': units(val)
            };
        },

        top: function(val) {
            return {
                'margin-top': units(val)
            };
        },

        bottom: function(val) {
            return {
                'margin-bottom': units(val)
            };
        },
    },

    border: {
        color: function(val) {
            return {
                'border-color': color(val)
            };
        },

        width: function(val) {
            return {
                'border-width': units(val)
            };
        },

        style: function(val) {
            return {
                'border-style': val
            };
        },

        radius: function(val) {
            return {
                'border-radius': units(val)
            };
        },

        top: {
            color: function(val) {
                return {
                    'border-top-color': color(val)
                };
            },

            width: function(val) {
                return {
                    'border-top-width': units(val)
                };
            },

            style: function(val) {
                return {
                    'border-top-style': val
                };
            },            
        },

        bottom: {
            color: function(val) {
                return {
                    'border-bottom-color': color(val)
                };
            },

            width: function(val) {
                return {
                    'border-bottom-width': units(val)
                };
            },

            style: function(val) {
                return {
                    'border-bottom-style': val
                };
            },            
        },

        left: {
            color: function(val) {
                return {
                    'border-left-color': color(val)
                };
            },

            width: function(val) {
                return {
                    'border-left-width': units(val)
                };
            },

            style: function(val) {
                return {
                    'border-left-style': val
                };
            },            
        },

        right: {
            color: function(val) {
                return {
                    'border-right-color': color(val)
                };
            },

            width: function(val) {
                return {
                    'border-right-width': units(val)
                };
            },

            style: function(val) {
                return {
                    'border-right-style': val
                };
            },            
        },
    }

}

var jss = module.exports = {
    generateProperties: function(config) {
        var properties = {};

        processConfig(config, processors);

        function processConfig(conf, proc) {
            _.each(conf, function(subConf, key) {
                var subProc = proc[key];

                if (isPlainObject(subConf)) {
                    processConfig(subConf, subProc);
                } else if (subProc != undefined) {
                    var generator;

                    if (_.isFunction(subProc)) {
                        generator = subProc;
                    } else {
                        generator = subProc.scalar;
                    }
                    _.extend(properties, 
                        generator(subConf)
                    );
                }
            });
        }

        return properties;
    },

    generateRule: function(selector, config) {
        var properties = jss.generateProperties(config);

        var propertiesString = _.map(properties, function(val, key) {
            return "\t" + key + ": " + val +";\n";
        }).join('');

        var css = selector + " " + "{\n" + propertiesString + "}";
        return css;        
    }
}; 