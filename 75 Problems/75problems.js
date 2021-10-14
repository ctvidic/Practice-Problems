
//#1 Two-Sum
//Summary: Store numbers,indices in hash to save lookup time, check for number complement
//Time Complexity: O(n)

var twoSum = function (nums, target) {
    let hash = {}
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        if (hash[complement] !== undefined) {
            return [i, hash[complement]]
        } else {
            hash[nums[i]] = i;
        }
    }
};

//#121 Best Time to Buy and Sell Stock
//Summary: One-pass keep track of min and max indices, get difference between them
//Time Complexity: O(n)
var maxProfit = function (prices) {
    let max = 0;
    let min = 0;
    let maxSell = 0
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] > prices[max]) {
            max = i;
            maxSell = Math.max(maxSell, prices[max] - prices[min])
        }
        if (prices[i] < prices[min]) {
            min = i;
            max = i;
        }

    }
    return maxSell;
};

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

//#238 Product of Array Except Self
//Summary: Right pass and left pass multiplier
//Time Complexity: O(n)

var productExceptSelf = function (nums) {
    var output = [];
    var leftMult = 1;
    var rightMult = 1;
    for (var i = nums.length - 1; i >= 0; i--) {
        output[i] = rightMult;
        rightMult *= nums[i];
    }
    for (var j = 0; j < nums.length; j++) {
        output[j] *= leftMult;
        leftMult *= nums[j];
    }
    return output;
};


//#53 Maximum Subarray
//Summary: Implement Kadanes algorithm for most efficient process
//Time Complexity: O(n)
var maxSubArray = function (nums) {
    let currentMax = nums[0];
    let max = nums[0];

    for (let i = 1; i < nums.length; i += 1) {
        currentMax = Math.max(currentMax + nums[i], nums[i]);
        max = Math.max(currentMax, max);
    }
    return max;
}

//#152 Maximum Product Subarray
//Summary: Utilize Kadanes algorithm to keep track of min and max
//Time Complexity: O(n)
var maxProduct = function (nums) {
    let max = nums[0];
    let currMax = 1;
    let currMin = 1;
    for (let i = 0; i < nums.length; i++) {
        let tempMax = currMax;
        currMax = Math.max(Math.max(nums[i] * currMax, nums[i] * currMin), nums[i])
        currMin = Math.min(Math.min(nums[i] * tempMax, nums[i] * currMin), nums[i])
        max = Math.max(currMax, max)
    }
    return max
};


//#153 Find Minimum in Rotated Sorted Array
//Summary: Utilize binary search to break up array based of endpoints.
var findMin = function (nums) {
    if (nums.length == 1) {
        return nums[0];
    }

    let mid = Math.floor(nums.length / 2);
    if (nums[mid] < nums[mid - 1]) {
        return nums[mid];
    } else if (nums[mid] > nums[0] && nums[mid] > nums[nums.length - 1]) {
        return findMin(nums.slice(mid + 1, nums.length));
    } else {
        return findMin(nums.slice(0, mid));
    }
};