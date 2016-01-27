var J = require('j');
var GenerateHandwriting = require('./generateHandwriting');

var GenerateList = function(
    spreadsheet_path, input_text_column, output_dir, output_filename_column, handwriting_options, api_key, api_secret, type
) {

    var model = this;

    model.files = {};

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

        var out_path = output_dir + row[output_filename_column] + '.' + type;

        // Check for overwriting within this batch
        if(model.files.hasOwnProperty(out_path)){
            throw new Error("File '"+out_path+"' was already written in a previous row. Check column '" +
                output_filename_column + "' for uniqueness." );
        }

        var text = row[input_text_column];
        handwriting_options.setText(text);

        options = handwriting_options.getOptions();

        var gh = new GenerateHandwriting(api_key, api_secret, type, options);

        if(gh.generate(out_path) === true){
            model.files.out_path = 1;
        }
    });


};

module.exports = GenerateList;
