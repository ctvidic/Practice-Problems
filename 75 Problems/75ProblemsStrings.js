//#20 Valid Parentheses
//Summary: The stack method works well for this, if el is present in map, 
//push the object value into stack. Else, check if its next, if not, its not valid
//Time Complexity: O(N)

var map = {
    "(": ")",
    "[": "]",
    "{": "}"
}
var isValid = function (s) {
    var stack = [];
    for (var i = 0; i < s.length; i++) {
        var el = s[i];
        if (map[el]) {
            stack.push(map[el]);
        } else {
            if (el !== stack.pop()) {
                return false;
            }
        }
    }

    return stack.length === 0;
};

//OR
//a simpler way

var isValid = function (s) {
    while (s.indexOf('[]') !== -1 || s.indexOf('{}') !== -1 || s.indexOf('()') !== -1) {
        s = s.replace('[]', '');
        s = s.replace('()', '');
        s = s.replace('{}', '');
    }
    return s === ""
};

