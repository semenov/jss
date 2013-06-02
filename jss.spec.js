var jss = require('./jss');
var assert = require('assert');
var fs = require('fs');

function loadCss(name) {
    var path = './samples/' + name + '.css';
    return fs.readFileSync(path, 'utf8');
}

function verifyProperies(config, expected) {
    var properies = jss.generateProperties(config);
    assert.deepEqual(properies, expected);
}

describe('JSS', function() {
    // it('generates empty CSS', function() {
    //  var css = jss('.selector', {});
    //  var sampleCss = sample('empty');
    //  assert.equal(css, sampleCss);
    // });

    describe('text', function() {
        it('color', function() {
            verifyProperies(
                {
                    text: {
                        color: [0, 0, 0]
                    }
                },
                {
                    'color': 'rgb(0, 0, 0)'
                }
            );
        });

        it('align', function() {
            verifyProperies(
                {
                    text: {
                        align: {
                            horizontal: 'center',
                            vertical: 'middle'
                        }
                    }
                },
                {
                    'text-align': 'center',
                    'vertical-align': 'middle'
                }
            );
        });
    });


    describe('background', function() {
        it('color', function() {
            verifyProperies(
                {
                    background: {
                        color: [0, 0, 0]
                    }
                },
                {
                    'background-color': 'rgb(0, 0, 0)'
                }
            );
        });
    });

    describe('padding', function() {
        it('universal', function() {
            verifyProperies(
                {
                    padding: 5
                },
                {
                    'padding': '5px'
                }
            );
        });

        it('horizontal and vertical', function() {
            verifyProperies(
                {
                    padding: {
                        horizontal: 10,
                        vertical: 5
                    }
                },
                {
                    'padding-left': '10px',
                    'padding-right': '10px',
                    'padding-top': '5px',
                    'padding-bottom': '5px'
                }
            );
        });

        it('all sides', function() {
            verifyProperies(
                {
                    padding: {
                        left: 1,
                        right: 2,
                        top: 3,
                        bottom: 4
                    }
                },
                {
                    'padding-left': '1px',
                    'padding-right': '2px',
                    'padding-top': '3px',
                    'padding-bottom':'4px'
                }
            );
        });

        it('vertical and left', function() {
            verifyProperies(
                {
                    padding: {
                        vertical: 5,
                        left: 10
                    }
                },
                {
                    'padding-left': '10px',
                    'padding-top': '5px',
                    'padding-bottom':'5px'
                }
            );
        });

    });

    describe('margin', function() {
        it('universal', function() {
            verifyProperies(
                {
                    margin: 5
                },
                {
                    'margin': '5px'
                }
            );
        });

        it('horizontal and vertical', function() {
            verifyProperies(
                {
                    margin: {
                        horizontal: 10,
                        vertical: 5
                    }
                },
                {
                    'margin-left': '10px',
                    'margin-right': '10px',
                    'margin-top': '5px',
                    'margin-bottom': '5px'
                }
            );
        });

        it('all sides', function() {
            verifyProperies(
                {
                    margin: {
                        left: 1,
                        right: 2,
                        top: 3,
                        bottom: 4
                    }
                },
                {
                    'margin-left': '1px',
                    'margin-right': '2px',
                    'margin-top': '3px',
                    'margin-bottom':'4px'
                }
            );
        });

        it('vertical and left', function() {
            verifyProperies(
                {
                    margin: {
                        vertical: 5,
                        left: 10
                    }
                },
                {
                    'margin-left': '10px',
                    'margin-top': '5px',
                    'margin-bottom':'5px'
                }
            );
        });
    });

    describe('border', function() {
        it('color (hex)', function() {
            verifyProperies(
                {
                    border: {
                        color: '#00FF00'
                    }
                },
                {
                    'border-color': '#00FF00'
                }
            );
        });   

        it('color (rgb)', function() {
            verifyProperies(
                {
                    border: {
                        color: [0, 255, 0]
                    }
                },
                {
                    'border-color': 'rgb(0, 255, 0)'
                }
            );
        });  


        it('color (rgba)', function() {
            verifyProperies(
                {
                    border: {
                        color: [0, 255, 0, 0.5]
                    }
                },
                {
                    'border-color': 'rgba(0, 255, 0, 0.5)'
                }
            );
        }); 

        it('width', function() {
            verifyProperies(
                {
                    border: {
                        width: 1
                    }
                },
                {
                    'border-width': '1px'
                }
            );
        }); 

        it('style', function() {
            verifyProperies(
                {
                    border: {
                        style: 'solid'
                    }
                },
                {
                    'border-style': 'solid'
                }
            );
        }); 

        it('radius', function() {
            verifyProperies(
                {
                    border: {
                        radius: 5
                    }
                },
                {
                    'border-radius': '5px'
                }
            );
        }); 

        it('top', function() {
            verifyProperies(
                {
                    border: {
                        top: {
                            color: '#00FF00',
                            width: 1,
                            style: 'solid'
                        }
                    }
                },
                {
                    'border-top-color': '#00FF00',
                    'border-top-width': '1px',
                    'border-top-style': 'solid',
                }
            );
        }); 

        it('bottom', function() {
            verifyProperies(
                {
                    border: {
                        bottom: {
                            color: '#00FF00',
                            width: 1,
                            style: 'solid'
                        }
                    }
                },
                {
                    'border-bottom-color': '#00FF00',
                    'border-bottom-width': '1px',
                    'border-bottom-style': 'solid',
                }
            );
        });  

        it('left', function() {
            verifyProperies(
                {
                    border: {
                        left: {
                            color: '#00FF00',
                            width: 1,
                            style: 'solid'
                        }
                    }
                },
                {
                    'border-left-color': '#00FF00',
                    'border-left-width': '1px',
                    'border-left-style': 'solid',
                }
            );
        });  

        it('right', function() {
            verifyProperies(
                {
                    border: {
                        right: {
                            color: '#00FF00',
                            width: 1,
                            style: 'solid'
                        }
                    }
                },
                {
                    'border-right-color': '#00FF00',
                    'border-right-width': '1px',
                    'border-right-style': 'solid',
                }
            );
        });   

    });

});