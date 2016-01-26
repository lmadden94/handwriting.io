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
        .usage('Usage: $0 --handwriting_id [handwriting_id]')
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
        .usage('Usage: $0 --id [handwriting_id]')
        .demand(['id'])
        .argv;
}

if(action === 'generate-list'){

}