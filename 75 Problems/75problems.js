
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