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

    var GenerateHandwriting = require('./generateHandwriting');
    var HandwritingOptions = require('./handwritingOptions.js');

    argv = require('yargs')
        .usage('Usage: $0 --handwriting_id [string] --text [string] --type[pdf/png]')
        .demand(['handwriting_id', 'text'])
        .argv;


    var type = argv.type;
    if(type !== 'pdf' && type !== 'png'){
        type = 'png';
        console.log('defaulting --type to "'+type+'"');
    }
    var api_key = argv.api_key;
    var api_secret = argv.api_secret;


    var ho = new HandwritingOptions(type);
    ho.setText(argv.text);

    var options = ho.getOptions();

    var gh = new GenerateHandwriting(api_key, api_secret, type, options);
    gh.generate('output/example.pdf');

}

if(action === 'generate-list'){

}