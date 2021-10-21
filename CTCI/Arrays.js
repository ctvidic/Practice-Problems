//Problem 1.1
//#217 Contains Duplicate
//Summary: Hash values to true if value in array
//Time Complexity: O(n)

var containsDuplicate = function (nums) {
    let hashNums = {};
    for (let i = 0; i < nums.length; i++) {
        if (hashNums[nums[i]] === undefined) {
            hashNums[nums[i]] = true
        } else if (hashNums[nums[i]]) {
            return true;
        }
    }
    return false;
};

//Brute Force Approach, but no additional data structures:
//Time Complexity: O(n^2)

var allUniqueChars = function (string) {

    // O(n^2) approach, no additional data structures used
    // for each character, check remaining characters for duplicates
    for (var i = 0; i < string.length; i++) {
        for (var j = i + 1; j < string.length; j++) {
            if (string[i] === string[j]) {
                return false; // if match, return false
            }
        }
    }
    return true; // if no match, return true
};

//Problem 1.2
//Summary: Sort the string, ensure same length
//Time Complexity: O(N)

var checkPermute = function (stringOne, stringTwo) {
    // if different lengths, return false
    if (stringOne.length !== stringTwo.length) {
        return false;
        // else sort and compare 
        // (doesnt matter how it's sorted, as long as it's sorted the same way)
    } else {
        var sortedStringOne = stringOne.split('').sort().join('');
        var sortedStringTwo = stringTwo.split('').sort().join('');
        return sortedStringOne === sortedStringTwo;
    }
};


//Problem 1.3
//Summary: Trim exterior whitespaces, then replace
//Time Complexity: O(N)
const replaceUrlSpaces = (str) => {
    const convertToArray = str.trim().split('');
    for (let i in convertToArray) {
        if (convertToArray[i] === " ") {
            convertToArray[i] = "%20"
        }
    }
    return convertToArray.join('');
}