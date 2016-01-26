#!/usr/bin/env node
var argv = require('yargs')
    .usage('Usage: $0 --api_key [string] --api_secret [string] --action [string]')
    .demand(['api_key','api_secret', 'action'])
    .argv;

var api_key = argv.api_key;
var api_secret = argv.api_secret;
var action = argv.action;

if(action === 'get-handwritings'){
    var json_tb = require('json-table');
    var Hw = require('handwriting.io');
    var hw = new Hw({apiKey: api_key, apiSecret: api_secret});

    hw.getAllHandwritings(function(err, handwritings){
        if (err) {
            return console.log(err);
        }
        new json_tb(handwritings, null, function(table) {
            table.show();
        });
    });
}

if(action === 'get-handwriting'){
    var json_tb = require('json-table');
    var Hw = require('handwriting.io');
    var hw = new Hw({apiKey: api_key, apiSecret: api_secret});

    argv = require('yargs')
        .usage('Usage: $0 --handwriting_id [string]')
        .demand(['handwriting_id'])
        .argv;

    var handwriting_id = argv.handwriting_id;

    hw.getHandwriting(handwriting_id, function(err, handwriting){
        if (err){
            return console.log(err);
        }
        new json_tb(handwriting, null, function(table) {
            table.show();
        });
    });
}

if(action === 'generate-single'){
    argv = require('yargs')
        .usage('Usage: $0 --handwriting_id [string] --text [string] --type[pdf/png]')
        .demand(['handwriting_id', 'text'])
        .argv;

    var fs = require('fs');
    var Hw = require('handwriting.io');
    var hw = new Hw({apiKey: api_key, apiSecret: api_secret});

    var type = argv.type;
    var text = argv.text;

    var opts = {
        handwriting_color: '#000000',
        handwriting_id: '2D5QW0F80001',
        handwriting_size: '20px',
        height: 'auto',
        line_spacing: '1.2',
        text:text,
        width: '504px'
    };


    if(type === 'pdf'){
        hw.getPdf(opts, function(err, pdf){
            if (err){
                return console.log(err);
            }

            console.log('pdf', pdf); //pdf binary data
        });
    } else {
        hw.getPng(opts, function(err, image){
            if (err){
                return console.log(err);
            }

            fs.writeFile('output/test.png', image, 'binary', function(err){
                if (err) throw err;
                console.log('File saved.')
            });
            //console.log('img', image); //image binary data
        });
    }

}

if(action === 'generate-list'){

}