var Hw = require('handwriting.io');
var fs = require('fs');

var GenerateHandwriting = function(api_key, api_secret, type, text) {

    var model = this;

    model.hw = new Hw({apiKey: api_key, apiSecret: api_secret});

    var opts = {
        handwriting_color: '(0,0,0,1)',
        handwriting_id: '2D5QW0F80001',
        handwriting_size: '20pt',
        height: 'auto',
        line_spacing: '1.2',
        text: text,
        width: '4in'
    };

    model.generate = function(){
        if(type === 'pdf'){
            model.hw.getPdf(opts, function(err, pdf){
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
            model.hw.getPng(opts, function(err, image){
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
