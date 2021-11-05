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


//200 Num Islands
//Summary: DFS approach, pretty straightforward
//Time Complexity: O(M x N) M--> # Rows N--> #Cols

var numIslands = function (grid) {
    let gridCopy = grid.slice()

    var dfs = function (col, row) {
        gridCopy[col][row] = 'X'
        if (col > gridCopy.length || col < 0) {
            return
        }
        if (row > gridCopy[col].length || row < 0) {
            return
        }
        if (gridCopy[col][row - 1] === '1') {
            console.log('hit')
            dfs(col, row - 1)
        }
        if (gridCopy[col][row + 1] === '1') {
            dfs(col, row + 1)
        }
        if (gridCopy[col + 1]) {
            if (gridCopy[col + 1][row] === '1') {
                dfs(col + 1, row)
            }
        }
        if (gridCopy[col - 1]) {
            if (gridCopy[col - 1][row] === '1') {
                dfs(col - 1, row)
            }
        }
    }
    let total = 0;
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            if (gridCopy[col][row] === '1') {
                dfs(col, row)
                total++
            }
        }
    }
    return total

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
