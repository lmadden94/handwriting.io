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
        .options({
            t: {
                alias : 'type',
                describe: 'pdf or png',
                type: 'string',
                default: 'pdf'
            },
            o: {
                alias : 'output_path',
                describe: 'path for the handwriting output file',
                type: 'string',
                demand: true
            }
        })
        .demand(['handwriting_id', 'text'])
        .argv;

    var ho = new HandwritingOptions(argv.type);

    ho.setText(argv.text);
    var options = ho.getOptions();

    var gh = new GenerateHandwriting(argv.api_key, argv.api_secret, argv.type, options);
    gh.generate(argv.output_path, function(){
        // done
    });

}

if(action === 'generate-list'){
    var GenerateList = require('./generateList');
    var HandwritingOptions = require('./handwritingOptions.js');

    argv = require('yargs')
        .usage('Usage: $0 --sheet [string] --text_column [string] --output_column [string]')
        .options({
            s: {
                alias : 'sheet',
                describe: 'path to the input spreadsheet',
                type: 'string',
                demand: true
            },
            t: {
                alias : 'text_column',
                describe : 'column which has the text to be handwritten',
                type: 'string',
                demand: true
            },
            o: {
                alias : 'output_column',
                describe : 'column which has the text to be handwritten',
                type: 'string',
                demand: true
            },
            d: {
                alias : 'output_dir',
                describe : 'output directory',
                type: 'string',
                demand: true
            }
        })
        .argv;

    // Check for duplicates
    var ho = new HandwritingOptions(argv.type);

    var gl = new GenerateList(
        argv.sheet,
        argv.text_column,
        argv.output_dir,
        argv.output_column,
        ho,
        argv.api_key,
        argv.api_secret,
        argv.type
    );

}