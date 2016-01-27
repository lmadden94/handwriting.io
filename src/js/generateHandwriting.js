var Hw = require('handwriting.io');
var fs = require('fs');

var GenerateHandwriting = function(api_key, api_secret, type, options) {

    var model = this;

    model.hw = new Hw({apiKey: api_key, apiSecret: api_secret});

    model.options = options;

    model.generate = function(out_path){
        if(type === 'pdf'){
            model.hw.getPdf(model.options, function(err, pdf){
                if (err){
                    return console.log(err);
                }

                //console.log('pdf', pdf); //pdf binary data

                fs.writeFile(out_path, pdf, 'binary', function(err){
                    if (err) throw err;
                    console.log(out_path+' saved.')
                });
            });
        } else {
            model.hw.getPng(model.options, function(err, image){
                if (err){
                    return console.log(err);
                }

                fs.writeFile(out_path, image, 'binary', function(err){
                    if (err) throw err;
                    console.log('File saved.')
                });
                //console.log('img', image); //image binary data
            });
        }
    }

};

module.exports = GenerateHandwriting;
