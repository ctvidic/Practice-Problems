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


//Problem 1.9
//#48 Rotate Image
//Summary: First transpose, then reverse values,all while working on one array.
//Time Complexity: O(N)
var rotate = function (matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = y + 1; x < matrix[y].length; x++) {
            let temp = matrix[x][y]
            matrix[x][y] = matrix[y][x];
            matrix[y][x] = temp;
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < Math.floor(matrix.length / 2); x++) {
            let left = matrix[y][x]
            let right = matrix[y][matrix.length - x - 1];
            matrix[y][x] = right;
            matrix[y][matrix.length - x - 1] = left;
        }
    }
};


//Summary: 
//Problem 1.8
//#73 Set Matrix Zeros
//Summary: Identify locations of 0 in first pass, then store row coloumn in hash,
//second pass remove values;

var setZeroes = function (matrix) {
    hashX = {};
    hashY = {};
    let sorted = false;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 0) {
                hashX[x] = true;
                hashY[y] = true;
            }
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (hashX.hasOwnProperty(x)) {
                matrix[y][x] = 0;
            }
            if (hashY.hasOwnProperty(y)) {
                matrix[y][x] = 0;
            }
        }
    }
    return matrix;
};

//In order to do O(1) we must change in place, use a marker

const setZeroes = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 0) {
                mark(matrix, i, j)
            }
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === null) {
                matrix[i][j] = 0
            }
        }
    }
}

const mark = (matrix, row, col) => {
    for (let j = 0; j < matrix[0].length; j++) {
        //preserve original 0, mark items that should zero as null
        if (matrix[row][j] !== 0) {
            matrix[row][j] = null
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        //preserve original 0, mark items that should be zero as null
        if (matrix[i][col] !== 0) {
            matrix[i][col] = null
        }
    }
}

//Problem 1.9
//#796 Rotate String
var rotateString = function (s, goal) {
    let splitS = s.split('');
    let splitGoal = goal.split('')
    for (let i = 0; i < splitS.length; i++) {
        if (splitS.join('') === splitGoal.join('')) {
            return true;
        } else {
            splitS.unshift(splitS.pop());
        }
    }
    return false;
};
//Faster
var rotateString = function (A, B) {
    for (let shift = 0; shift < A.length; shift++) if (A.slice(shift) + A.slice(0, shift) === B) return true;
    return false
};

//My favorite, reduced space complexity
var rotateString = function (string1, string2) {
    if (string1.length !== string2.length) {
        return false;
    }
    return (string2 + string2).includes(string1); 
};

//Problem 1.6
//#443 String Compression
//Summary: Annoying problem, utilize splice and counts to either decrement
//increment through the array.

var compress = function (chars) {
    let n = chars.length;
    let count = 1;

    for (let i = n - 2; i >= 0; i--) {
        if (chars[i] == chars[i + 1]) {
            count++;
        } else if (count > 1) {
            chars.splice(i + 2, count - 1, ...count.toString().split(''));
            count = 1;
        }
    }

    if (count > 1) {
        chars.splice(1, count - 1, ...count.toString().split(''));
    }

    return chars.length;
};