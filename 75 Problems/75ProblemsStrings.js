//#3 Longest Substring Without Repeating Characters
//Summary: Sliding window method, if value is present in hash and the index is greater
//then j, move j to index + 1, keep track of max, that being the window(i-j)
//Time Complexity: O(n)

var lengthOfLongestSubstring = function (s) {
    let splitS = s.split('');
    let max = 0;
    let j = 0;
    let hash = {};
    for (let i = 0; i < splitS.length; i++) {
        if (hash.hasOwnProperty(splitS[i]) && hash[splitS[i]] >= j) {
            j = hash[splitS[i]] + 1
        }
        hash[splitS[i]] = i;
        max = Math.max(max, i - j + 1)
    }
    return max;

};

//#424 Longest Repeating Character Replacement
//Summary : Sliding window method, important to understand you always want to replace
//characters that are not the max character within a string. Sliding window will
//optomize for the maximum in this case.
//Time Complexity: O(N)

var characterReplacement = function (s, k) {
    let splitS = s.split('');
    let left = 0;
    let charCount = {};
    let maxCharCount = 0;
    let right = 0;
    for (right; right < splitS.length; right++) {
        if (charCount.hasOwnProperty(splitS[right])) {
            charCount[splitS[right]]++;
        } else {
            charCount[splitS[right]] = 1;
        }
        maxCharCount = Math.max(maxCharCount, charCount[splitS[right]]);
        if (right - left + 1 - maxCharCount > k) {
            charCount[splitS[left]]--
            left++;
        }
    }
    return right - left;
};

//76 Minimum Window Substring
//Summary: Sliding window problem, optimize for the minimum value.
//In order to pass TLE need time optimized way to check if all letters are present,
//so utilize the sum variable.
//Time Complexity: O(N)
var minWindow = function (s, t) {
    let splitS = s.split('');
    let tSplit = t.split('');
    let min = "";
    let j = 0;
    let letterCount = {};
    let sum = 0;
    for (let j = 0; j < tSplit.length; j++) {
        let letter = tSplit[j];
        if (letterCount.hasOwnProperty(letter)) {
            letterCount[letter] += 1;
        } else {
            sum += 1;
            letterCount[letter] = 1;
        }
    }
    for (let i = 0; i <= splitS.length; i++) {
        let letter = splitS[i];
        if (letterCount.hasOwnProperty(letter)) {
            letterCount[letter] -= 1;
            if (letterCount[letter] === 0) {
                sum--;
            }
        }
        if (sum === 0 && min === "") {
            min = [j, i + 1]
        }
        // while(hasAllCharacters(letterCount) && j<=i){
        while (sum === 0 && j <= i) {
            min = compareMin(min, [j, i + 1]);
            if (letterCount.hasOwnProperty(splitS[j])) {
                letterCount[splitS[j]] += 1;
                if (letterCount[splitS[j]] === 1) {
                    sum++;
                }
            }
            j++;
        }
    }
    if (min.length > 0) {
        return splitS.slice(min[0], min[1]).join('');
    } else {
        return ""
    }

};
var compareMin = function (min, test) {
    if ((test[1] - test[0]) < (min[1] - min[0])) {
        return test
    }
    return min;
}

//242 Valid Anagram
//Summary: Sort then compare, simple.
//Time Complexity: O(n)

var isAnagram = function (s, t) {
    let sSort = s.split('').sort().join('');
    let tSort = t.split('').sort().join('');
    if (sSort === tSort) {
        return true
    }
    return false
};

//49 Group Anagrams
//Summary: Sort word, see if its in hash, push into resulting hash index
//Time Complexity(O(N)??)

var groupAnagrams = function (strs) {
    let hash = {};
    let hashI;
    let finalArr = [];
    for (let i = 0; i < strs.length; i++) {
        let wordSorted = strs[i].split('').sort().join('')
        hashI = hash[wordSorted]
        if (hashI === undefined) {
            hash[wordSorted] = finalArr.length;
            finalArr.push([strs[i]]);
        } else {
            finalArr[hashI].push(strs[i])
        }
    }
    return finalArr
};

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

//#125 Valid Palindrome
//Summary: Easiest way is to get rid of excess characters and then set up the 
//two pointer approach
//Time Complexity: O(n)

var isPalindrome = function (s) {
    s = s.replace(/[^a-zA-Z0-9]/g, '')
    s = s.toLowerCase()
    for (let [i, j] = [0, s.length - 1]; i < j;) {
        if (s[i] != s[j]) {
            return false
        }
        i++
        j--
    }
    return true
};









//5 Longest Palindromic Substring
//Summary: Iterate through array, and expand from each point allowing either
//even or odd palindromes. Expand until not a palindrome. Compare to max,
//and then set substring.
//Time Complexity: O(n^2)

function longestPalindrome(s) {
    let splitS = s.split('');
    let max = 0;
    let maxString = '';
    for (let i = 0; i < splitS.length; i++) {
        let single = returnCount(s, i, i);
        let double = returnCount(s, i, i + 1);
        if (single > max && single >= double) {
            max = single
            maxString = s.substring(i - Math.floor(max / 2), i + Math.floor(max / 2) + 1);
        } else if (double > max && double > single) {
            max = double
            maxString = s.substring(i - (max / 2) + 1, i + (max / 2) + 1);
        }
    }
    return maxString;
}

function returnCount(s, l, r) {
    while (s[l] === s[r] && l >= 0 && r < s.length) {
        l--;
        r++;
    }
    r = r - 1
    l = l + 1
    return r - l + 1;
}

//657 Palindromic Substrings
//Summary: Expand outwards approach, accommodate for even and odd
//Time Complexity: O(N)

var countSubstrings = function (s) {
    let splitS = s.split('')
    let i = 0;
    let maxCount = 0
    while (i < splitS.length) {
        maxCount += oddSplit(i, splitS)
        maxCount += evenSplit(i, splitS)
        i++
    }
    return maxCount
};

var evenSplit = function (i, splitS) {
    let count = 0;
    if (i < splitS.length - 1 && splitS[i] === splitS[i + 1]) {
        let start = i;
        let end = i + 1
        while (start >= 0 && end < splitS.length && splitS[start] === splitS[end]) {
            count++
            start--
            end++
        }
    }
    return count
}

var oddSplit = function (i, splitS) {
    let count = 0;
    let start = i;
    let end = i
    while (start >= 0 && end < splitS.length && splitS[start] === splitS[end]) {
        count++
        start--
        end++
    }
    return count;
}