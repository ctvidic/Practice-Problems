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
//Summary: Similar to bit manipulation, need a carry\
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