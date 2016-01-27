var J = require('j');
var GenerateHandwriting = require('./generateHandwriting');

var GenerateList = function(
    spreadsheet_path, input_text_column, output_filename_column, handwriting_options, api_key, api_secret, type
) {

    var model = this;

    var readFileArray = J.readFile(spreadsheet_path);
    model.workbookJson = J.utils.to_json(readFileArray);

    // Check to make sure we don't have a workbook with multiple tabs
    model.workbookLength = Object.keys(model.workbookJson).length;
    if(model.workbookLength > 1){
        throw new Error("Workbook has more than 1 sheet. "+model.workbookLength+" found.");
    }

    // Set sheet
    for(var sheet_name in model.workbookJson){
        model.sheet = model.workbookJson[sheet_name];

        // Check text column exists
        if(!model.sheet[0].hasOwnProperty(input_text_column)){
            throw new Error("Column '"+input_text_column+"' does not exist.");
        }
        // Check output filename column exists
        if(!model.sheet[0].hasOwnProperty(output_filename_column)){
            throw new Error("Column '"+output_filename_column+"' does not exist.");
        }
    }

    // Create images
    var options;
    model.sheet.forEach(function(row){

        handwriting_options.setText(row[input_text_column]);

        options = handwriting_options.getOptions();

        var gh = new GenerateHandwriting(api_key, api_secret, type, options);
        gh.generate('output/' + row[output_filename_column] + '.' + type);

    });


};

module.exports = GenerateList;
