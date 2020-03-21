
// constructor
var Validation = function(id, regex) {
    this.id = id;
    this.regex = regex;
};

// method - validate regular expression
Validation.prototype.isValid = function() {
    var inputType = $(this.id);
    var regExp = this.regex;
    var error = this.id + "Error";

    inputType.on("blur", function() {
        if (!regExp.test(inputType.val())) {
            $(this).css("border", "1px solid red");
            $(error).show();
        } else {
            $(this).css("border", "none");
            $(error).hide();
        }
    });
    inputType.on("focus", function() {
        if (regExp.test(inputType.val())) {
            $(this).css("border", "none");
            $(error).hide();
        }
    });
};