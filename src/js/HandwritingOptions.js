
var HandwritingOptions = function(type) {

    var model = this;

    model.type = type;

    model.options = {
        handwriting_color: '(0,0,0,1)',
        handwriting_id: '2D5QW0F80001',
        handwriting_size: '20pt',
        height: 'auto',
        line_spacing: '1.2',
        width: '4in'
    };

    model.setText = function(text){
        model.options.text = text.replace(/\\n/g, '\n'); // Un-escape newlines
    };

    model.setLineSpacing = function(line_spacing){
        model.options.line_spacing = line_spacing;
    };

    model.setHandwritingColor = function(handwriting_color){
        model.options.handwriting_color = handwriting_color;
    };

    model.setHandwritingId = function(handwriting_id){
        model.options.handwriting_id = handwriting_id;
    };

    model.setHeight = function(height){
        model.options.height = height;
    };

    model.setWidth = function(width){
        model.options.width = width;
    };

    model.getOptions = function(){
        if(!model.options.text){
            return false;
        } else {
            return model.options;
        }
    };

};

module.exports = HandwritingOptions;
