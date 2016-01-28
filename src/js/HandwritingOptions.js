
var HandwritingOptions = function(type) {

    var model = this;

    model.type = type;

    // Set some defaults
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
        if(line_spacing){
            model.options.line_spacing = line_spacing;
        }
    };

    model.setHandwritingColor = function(handwriting_color){
        if(handwriting_color){
            model.options.handwriting_color = handwriting_color;
        }
    };

    model.setHandwritingSize = function(handwriting_size){
        if(handwriting_size){
            model.validateTypeUnits(handwriting_size, 'handwriting size');
            model.options.handwriting_size = handwriting_size;
        }
    };

    model.setHandwritingId = function(handwriting_id){
        if(handwriting_id){
            model.options.handwriting_id = handwriting_id;
        }
    };

    model.setHeight = function(height){
        if(height){
            model.validateTypeUnits(height, 'height');
            model.options.height = height;
        }
    };

    model.setWidth = function(width){
        if(width){
            model.validateTypeUnits(width, 'width');
            model.options.width = width;
        }
    };

    model.validateTypeUnits = function(value, parameter_name){

        var unit = value.slice(-2);

        // Verify units
        if(unit !== 'pt' && unit !== 'px'){
            throw new Error(
                "Unsupported '"+parameter_name+"' unit '"+unit+"'. Use px for png and pt for pdf."
            );
        }

        // Check unit/type matching
        if((unit === 'px' && model.type === 'pdf') ||
            (unit === 'pt' && model.type === 'png')){
            throw new Error(
                "Handwriting type '"+model.type+"' does not support '"+parameter_name+"' unit '"+unit+"'."
            );
        }
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
