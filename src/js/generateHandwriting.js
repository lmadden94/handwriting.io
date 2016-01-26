var Hw = require('handwriting.io');
var fs = require('fs');

var GenerateHandwriting = function(api_key, api_secret, type, options) {

    var model = this;

    model.hw = new Hw({apiKey: api_key, apiSecret: api_secret});

    model.options = options;

    model.generate = function(){
        if(type === 'pdf'){
            model.hw.getPdf(model.options, function(err, pdf){
                if (err){
                    return console.log(err);
                }

                //console.log('pdf', pdf); //pdf binary data

                fs.writeFile('output/test2.pdf', pdf, 'binary', function(err){
                    if (err) throw err;
                    console.log('File saved.')
                });
            });
        } else {
            model.hw.getPng(model.options, function(err, image){
                if (err){
                    return console.log(err);
                }

                fs.writeFile('output/test2.png', image, 'binary', function(err){
                    if (err) throw err;
                    console.log('File saved.')
                });
                //console.log('img', image); //image binary data
            });
        }
    }

};

module.exports = GenerateHandwriting;
