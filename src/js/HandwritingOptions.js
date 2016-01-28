
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

            var unit = handwriting_size.slice(-2);

            // Verify units
            if(unit !== 'pt' && unit !== 'px'){
                throw new Error(
                    "Unsupported handwriting size unit '"+unit+"'. Use px for png and pt for pdf."
                );
            }

            // Check unit/type matching
            if((unit === 'px' && model.type === 'pdf') ||
                (unit === 'pt' && model.type === 'png')){
                throw new Error(
                    "Handwriting type '"+model.type+"' does not suport size unit '"+unit+"'."
                );
            }

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
            model.options.height = height;
        }
    };

    model.setWidth = function(width){
        if(width){
            model.options.width = width;
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
