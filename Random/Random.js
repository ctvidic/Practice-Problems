//#14 Longest Common Prefix
//Summary: Substring must be in all and at beginning, so analyze for first
//instance that a substring DNE in the other word
//Time Complexity: O(N)

var longestCommonPrefix = function (strs) {
    if (strs.length === 0) return '';
    const first = strs[0];

    for (let i = 0; i < first.length; i++) {
        for (let j = 1; j < strs.length; j++) {
            const other = strs[j];

            if (other[i] !== first[i]) {
                return other.slice(0, i);
            }
        }
    }

    return first;
};


//#26  Remove Duplicates from Sorted Array
//Summary: Must return length of mutated array. Space limitations to O(1).
//Could solve using splice, but avoid and try to optimize.
//Use suggested two pointer approach, if duplicate then skip.
//It does not matter what comes after the unique values.
//Time Complexity: O(n)

var removeDuplicates = function (nums) {
    if (nums.length <= 1) return nums.length;
    let left = 0;
    let right = left + 1;
    const end = nums.length - 1;

    while (right <= end) {
        if (nums[left] === nums[right]) {
            right++;
        } else {
            left++;
            nums[left] = nums[right];
            right++;
        }
    }
    return left + 1;
};

//#27 Remove Element
//Summary: Similar to the last, this time use two pointer approach to switch values
//Time Complexity: O(n)
var removeElement = function (nums, val) {
    if (!nums || nums.length === 0) {
        return 0;
    }
    let n = nums.length, i = 0, j = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] === val) {
            j = i;
            while (j < n && nums[j] === val) {
                j++;
            }
            if (j >= n) {
                return i;
            }
            nums[i] = nums[j];
            nums[j] = val;
        }
    }
    return n;
};


//#735 Asteroid Collision
//Summary: Multiple ways to do this, implement a stack for most efficient
//Solution below simulates bubble sort so NOT efficient

var asteroidCollision = function (asteroids) {
    let sorted = false;
    while (!sorted) {
        let i = 0;
        sorted = true
        while (i < asteroids.length) {
            let current = asteroids[i];
            let next = asteroids[i + 1];
            if (current > 0 && next < 0 && next * -1 < current) {
                sorted = false;
                asteroids.splice(i + 1, 1)
            } else if (current > 0 && next < 0 && next * -1 > current) {
                sorted = false;
                asteroids.splice(i, 1)
            } else if (current > 0 && next < 0 && next * -1 === current) {
                sorted = false;
                asteroids.splice(i, 2)
            }
            i++
        }
    }
    return asteroids;
};

//Stack Method

var asteroidCollision = function (asteroids) {
    const stack = [];

    for (let i = 0; i < asteroids.length; i++) {
        const curr = asteroids[i];

        if (curr > 0) {
            stack.push(curr);
        } else {
            // if stack not empty
            // AND if top is positive
            // AND if top is smaller than curr
            while (
                stack.length &&
                stack[stack.length - 1] > 0 &&
                stack[stack.length - 1] < Math.abs(curr)
            ) {
                stack.pop();
            }

            // if stack not empty
            // AND if top has the same size as curr
            if (stack.length && stack[stack.length - 1] === Math.abs(curr)) {
                stack.pop();
            }
            // if stack is empty
            // OR top is negative
            else if (!stack.length || stack[stack.length - 1] < 0) {
                stack.push(curr);
            }
        }
    }

    return stack;
};

//1266 Minimum Time Visiting All Points
//Summary: Diagonal is most efficient, optimize for diagonal
//Time Complexity: O(N)

var minTimeToVisitAllPoints = function (points) {
    let seconds = 0;
    if (points.length < 1) {
        return seconds
    }
    for (let i = 0; i < points.length - 1; i++) {
        let current = points[i]
        let next = points[i + 1]
        let temp = points[i]
        if (next[0] === current[0]) {
            seconds += Math.abs(next[1] - current[1])
        } else if (next[1] === current[1]) {
            seconds += Math.abs(next[0] - current[0]);
        } else if (Math.abs(next[1] - current[1]) === Math.abs(next[0] - current[0])) {
            seconds += Math.abs(next[1] - current[1])
        } else {
            let move = Math.min(Math.abs(next[1] - current[1]), Math.abs(next[0] - current[0]))
            let max = Math.max(Math.abs(next[1] - current[1]), Math.abs(next[0] - current[0]))
            seconds += move + (max - move)
        }
    }
    return seconds;
};


//2 Add Two Numbers
//Summary: Similar to bit manipulation, need a carry
//By doing || carry you allow the carry to be tacked on at the end
//Time Complexity: O(N)

var addTwoNumbers = function (l1, l2) {
    const head = new ListNode();
    let cursor = head;
    let carry = 0;
    while (l1 || l2 || carry) {
        cursor.next = new ListNode();
        cursor = cursor.next;
        let val = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        carry = val >= 10 ? 1 : 0;
        cursor.val = val % 10;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    return head.next;
};

//696 Count Binary Substrings
//Summary: Expands outwards from differences in strings
//Time Complexity: O(N^2)

var countBinarySubstrings = function (s) {
    let sSplit = s.split('')
    let i = 0;
    let count = 0;
    while (i < sSplit.length - 1) {
        let firstLetter = sSplit[i];
        let secondLetter = sSplit[i + 1]
        if (firstLetter !== secondLetter) {
            count += expandI(i, s)
        }
        i++;
    }
    return count

};

var expandI = function (left, s) {
    let count = 1;
    let right = left + 1
    while (s[right] !== s[left] && s[right] === s[right + 1] && s[left] === s[left - 1] && left >= 0 && right < s.length) {
        right++;
        left--
        count++
    }
    return count
}

//79 Word Search
//Summary: Strategy is to find first letter than expand recursively
//and implement backtracking

const isOutOfBound = (board, row, col) => row < 0 || row >= board.length || col < 0 || col >= board[0].length;

const checkNeighbors = (board, word, row, col) => {
    // Check exit conditions
    if (!word.length) return true;
    if (isOutOfBound(board, row, col) || board[row][col] !== word[0]) return false;

    // Save some stuff
    const curChar = board[row][col];
    const newWord = word.substr(1);

    board[row][col] = 0; // Disable the current character

    // Check if neighbors are fruitful
    const results = checkNeighbors(board, newWord, row + 1, col) ||
        checkNeighbors(board, newWord, row - 1, col) ||
        checkNeighbors(board, newWord, row, col + 1) ||
        checkNeighbors(board, newWord, row, col - 1);

    // Enable current character
    board[row][col] = curChar;

    return results;
};


var exist = function (board, word) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (checkNeighbors(board, word, row, col)) return true;
        }
    }
    return false;
};


//42 Trapping Rain Water
//Time Complexity: O(N)
//Summary: Similar to max water, iterate based on smaller side towards center

function trap(height) {
    if (height == null || height.length === 0) return 0;
    let l = 0;
    let r = height.length - 1;

    let lMax = 0;
    let rMax = 0;

    let res = 0;

    while (l < r) {
        lMax = Math.max(lMax, height[l]);
        if (height[l] < lMax) {
            res += lMax - height[l];
        }

        rMax = Math.max(rMax, height[r]);
        if (height[r] < rMax) {
            res += rMax - height[r];
        }

        height[l] < height[r] ? l++ : r--;
    }

    return res;
}

//12 Integer to Roman
//Summary: This is the easy way of doing it, make a hash a then loop
//through each digit place
//Time Complexity: O(N)

function intToRoman(num) {
    var hash = [
        ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        ['', 'M', 'MM', 'MMM']
    ];

    var result = '';
    var counter = 0;
    while (num >= 1) {
        result = hash[counter][num % 10] + result;
        counter++
        num = Math.floor(num / 10);
    }

    return result;
};


//Remove Duplicates 1047
//Summary: Use a stack DS, basically it
//Time Complexity: O(N)
var removeDuplicates = function (s) {
    let i = 0;
    let splitS = s.split('')
    let stack = []
    while (i < splitS.length) {
        if (stack[stack.length - 1] === splitS[i]) {
            stack.pop()
        } else {
            stack.push(splitS[i])
        }
        i++
    }
    return stack.join('')
};


//819 Most Common Word
//Summary: Use a hash to store duplicate counts, iterate to see which count is
//the highest
//Time Complexity: O(N)

var mostCommonWord = function (paragraph, banned) {
    const bannedSet = new Set(banned);
    const words = paragraph.toLowerCase().split(/\W+/);
    const map = {};
    let max = 0;
    let finalWord;
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        if (map.hasOwnProperty(word)) {
            map[word]++
            if (map[word] > max) {
                finalWord = word;
                max = map[word]
            }
        } else if (banned.indexOf(word) === -1 && word.length > 0) {
            if (max === 0) {
                finalWord = word;
                max = 1;
            }
            map[word] = 1
        }
    }
    return finalWord
};

//Reverse Nodes in K group
//Summary: Use a runner to go k ahead to turn the tail to null,
//reverse, then recursively call function with new head until
//k length is not possible
//Time Complexity: O(N)
function reverseKGroup(head, k) {
    if (!head) return null;
    var tail = head;
    for (var i = 1; i < k; i++) {
        tail = tail.next;
        if (!tail) return head;
    }
    var next = tail.next;
    tail.next = null;
    reverse(head);
    head.next = reverseKGroup(next, k);
    return tail;
}

function reverse(curr) {
    var prev = null;
    while (curr) {
        var next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

//937 Reorder Log Files
//Summary: First use isNaN to check if its not a number,
//then use localeCompare to first check everything after identifier,
//then check identifiers
//Time Complexity: O(M*N*Log(N))

var reorderLogFiles = function (logs) {

    let letLogs = []
    let digiLogs = []
    for (let i = 0; i < logs.length; i++) {
        let log = logs[i]
        if (!isNaN(log.split(' ')[1])) {
            digiLogs.push(log)
        } else {
            letLogs.push(log)
            letLogs.sort((a, b) => {
                const aBody = a.slice(a.indexOf(' ') + 1);
                const bBody = b.slice(b.indexOf(' ') + 1);
                const c = aBody.localeCompare(bBody);
                if (c) return c;
                return a.localeCompare(b)
            });
        }
    }
    return letLogs.concat(digiLogs)
};




//1710 Maximum Units on a Truck
//Summary: Be greedy in this solution, always optimize for the
//unit to box ratio. Sort than implement
//Time Complexity: O(N)

var maximumUnits = function (boxTypes, truckSize) {
    let sizeCopy = truckSize
    boxTypes.sort((a, b) => {
        if (a[1] < b[1]) {
            return 1;
        } else {
            return -1;
        }
    })
    let numUnits = 0;
    for (let i = 0; i < boxTypes.length; i++) {
        while (boxTypes[i][0] > 0 && sizeCopy > 0) {
            if (sizeCopy > 0) {
                numUnits += boxTypes[i][1]
                boxTypes[i][0]--
                sizeCopy--
            }
        }
    }
    return numUnits

};


//6 ZigZag Conversion
//Summary: Iterate through each row, algorithm has to precisely add each charcter
//Time Complexity: O(N)

var convert = function (s, numRows) {
    if (numRows === 1) {
        return s
    }
    let splitS = s.split('');
    let finalS = ''
    let i = 0;
    let row = 0;
    while (row < numRows) { //outer while loop iterates through each row
        i = row
        while (i < splitS.length) { //inner loop adds the characters of row each to the final string
            if (row > 0 && row < numRows - 1) {
                finalS += splitS[i] //first add first character 
                if (i + 2 * (numRows) - 2 * (row) - 2 < splitS.length) {
                    finalS += splitS[i + (2 * numRows) - (2 * row) - 2] //then add zig zag character in same row
                }
                i += (2 * numRows - 2)
            } else { //else statement only applies to outer rows not affected by zigzag
                finalS += splitS[i]
                i += (2 * numRows - 2)
            }
        }
        row++
    }
    return finalS
};

//543 Diameter of Binary Tree
//Summary: Recursively find max distance using DFS
//Time Complexity: O(N)

var diameterOfBinaryTree = function (root) {
    let diameter = 0;

    dfs(root);

    return diameter;

    function dfs(node, level) {
        if (!node) return 0;

        const left = dfs(node.left);
        const right = dfs(node.right);

        diameter = Math.max(diameter, left + right);

        return 1 + Math.max(left, right);
    }
};

//1041 Robot Bounded In Circle
//Summary: Simulate the robot moving, but utilize 4 cycles to verify
//the location, this is more of mathematical problem
//Time Complexity: 4*O(N)

var isRobotBounded = function (instructions) {
    let splitI = instructions.split('')
    let pos = [0, 0]
    let directionVal = 0;
    let x = 0
    while (x < 4) {
        for (let i = 0; i < splitI.length; i++) {
            if (splitI[i] === 'G') {
                pos = positionChange(pos, directionVal)
            } else if (splitI[i] === 'L') {
                directionVal--
                if (directionVal < 0) {
                    directionVal = 3;
                }
            } else if (splitI[i] === 'R') {
                directionVal++
                if (directionVal > 3) {
                    directionVal = 0
                }
            }
        }
        x++
    }

    if (pos[0] !== 0 || pos[1] !== 0) {
        return false
    }
    return true

};

var positionChange = function (pos, direction) {
    if (direction === 0) {
        pos[1]++;
    } else if (direction === 2) {
        pos[1]--
    } else if (direction === 3) {
        pos[0]--
    } else if (direction === 1) {
        pos[0]++
    }
    return pos
}


//680 Valid Palindrome II
//Summary: Pretty inefficient solution but seems to be O(N),
//self explanatory, requires helper methods, note you are only
//looking for one instance where this is not true. If both cuts
//are not a palindrome then we know there are more characters not in line
//Time Complexity: O(N)

const validPalindrome = (s) => {
    let i = 0;
    let j = s.length - 1
    while (i < j) {
        j = s.length - i - 1
        if (s[i] !== s[j]) {
            let newS = cut(s, j)
            let newI = cut(s, i)
            return isPalindrome(newS) || isPalindrome(newI)
        }
        i++
    }
    return true
};

const cut = (s, i) => s.substr(0, i) + s.substr(i + 1);

const isPalindrome = (s) => s === s.split('').reverse().join('');


//108 Convert Sorted Array to Binary Tree
//Summary: Important to note that using eith Math.floor
//or Math.ceil work in this instance, even though there will
//be two different answers both are valid
//Time Complexity: O(N)

var sortedArrayToBST = function (nums) {
    const helper = function (left, right) {
        if (left > right) {
            return null
        }
        let mid = Math.floor((left + right) / 2)
        let root = new TreeNode(nums[mid]);
        root.left = helper(left, mid - 1)
        root.right = helper(mid + 1, right)
        return root
    }

    return helper(0, nums.length - 1)
};


//442: Find Duplicates in an Array
//Summary: Key thing is that numbers are between 1 and the index,
//therefore loop through once and mark numbers as negative, if number
//is negative push it into results array. Each integer also only appears
//ONCE or TWICE
//Time Complexity: O(n), Space: Constant
var findDuplicates = function(nums){
for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1
    if (nums[index] < 0) {
        result.push(index + 1)
    }
    nums[index] = -Math.abs(nums[index])
}
return result
}

//4 Median of Two Sorted Arrays
//Summary: Fairly difficult, partition both arrays, then
//use a modified binary search to go through
//Time Complexity: O(log(m+n))
var findMedianSortedArrays = function (nums1, nums2) {


    //Find smallest array, always have it be nums1
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    const m = nums1.length;
    const n = nums2.length;

    //Set start to 0, end to end of nums1
    let start = 0;
    let end = m;
    // Binary search starts from here
    while (start <= end) {
        //Find median of first array         
        let partitionNums1 = Math.floor((start + end) / 2);
        //Find median of sorted, minus partitionNums
        let partitionNums2 = Math.floor((m + n + 1) / 2) - partitionNums1;

        // Edge cases
        // If there are no elements left on the left side after partition
        let maxLeftNums1 = partitionNums1 == 0 ? Number.MIN_SAFE_INTEGER : nums1[partitionNums1 - 1];
        // If there are no elements left on the right side after partition
        let minRightNums1 = partitionNums1 == m ? Number.MAX_SAFE_INTEGER : nums1[partitionNums1];

        // Similarly for nums2
        let maxLeftNums2 = partitionNums2 == 0 ? Number.MIN_SAFE_INTEGER : nums2[partitionNums2 - 1];
        let minRightNums2 = partitionNums2 == n ? Number.MAX_SAFE_INTEGER : nums2[partitionNums2];
        // Check if we have found the match
        if (maxLeftNums1 <= minRightNums2 && maxLeftNums2 <= minRightNums1) {
            // Check if the combined array is of even/odd length
            if ((m + n) % 2 == 0) {
                return (Math.max(maxLeftNums1, maxLeftNums2) + Math.min(minRightNums1, minRightNums2)) / 2.0;
            } else {
                return Math.max(maxLeftNums1, maxLeftNums2);
            }
        }
        // If we are too far on the right, we need to go to left side
        else if (maxLeftNums1 > minRightNums2) {
            end = partitionNums1 - 1;
        }
        // If we are too far on the left, we need to go to right side
        else {
            start = partitionNums1 + 1;
        }
    }
};


//22 Generate Parentheses
//Summary: Utilize basic backtracking to build out the parentheses
//Parenthese MUST have equal number of left and right to be valid
//Instead of adding '(' or ')' every time as in Approach 1, 
//let's only add them when we know it will remain a valid sequence. 
// We can do this by keeping track of the number of opening and closing brackets we have placed so far.
//Time Complexity: O(4^n/sqrt(n)) H



const generateParenthesis = (n) => {
    const res = [];

    function backtrack(l, r, s) {  // l: left remaining, r: right remaining
        if (l > r) return;  // The number of '(' should be always >= ')'
        if (l === 0 && r === 0) {
            res.push(s);
            return;
        }
        if (l > 0) backtrack(l - 1, r, s + '(');
        if (r > 0) backtrack(l, r - 1, s + ')');
    }

    backtrack(n, n, '');
    return res;
};

//1470 Shuffle The Array
//Summary: Very easy, just have a second pointer starting at part of array
//to be mixed in, continue until second pointer ends
//Time Complexity: O(N)


var shuffle = function(nums, n) {
    let x = 0;
    let y = n;
    let newArr =[];
    while(y<nums.length){
        newArr.push(nums[x])
        newArr.push(nums[y])
        x++;
        y++;
    }
    return newArr
};


//767 Reorganize String
//Summary: First create hash of amount of times a character appears,
//then sort hash by number of times. We then take a greedy approach and insert the
//character into alternating (even or odd) spots to ensure they are not next to each other.
//Then move onto next character until entire new array is filled.
//Time Complexity: O(N)
let reorganizeString = function (S) {
    let frequencyMap = generateFrequencyMap(S);

    let charactersByFrequency = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
    let res = new Array(S.length);
    let characterIndex = 0;
    for (let i = 0; i < S.length; i++) {
        const totalOccurrences = frequencyMap[charactersByFrequency[i]];

        for (let j = 0; j < totalOccurrences; j++) {
            if (characterIndex >= S.length) {
                characterIndex = 1;
            }
            res[characterIndex] = charactersByFrequency[i];
            characterIndex += 2;
        }
    }

    for (let i = 1; i < res.length; i++) {
        if (res[i] === res[i - 1]) {
            return "";
        }
    }

    return res.join('');
};

function generateFrequencyMap(str) {
    let map = {};
    for (let i = 0; i < str.length; i++) {
        if (map[str[i]] !== undefined) {
            map[str[i]]++;
        } else {
            map[str[i]] = 1;
        }
    }
    return map;
}
