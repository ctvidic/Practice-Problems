
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
//Summary: Utilize binary search to break up array based of endpoints, compare to mid-1.
//Time Complexity: log(N)
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


//#33. Search in Rotated Sorted Array
//Summary: Utilize binary search, use logic
//     IF LEFT < RIGHT --> IF LEFT < TARGET && TARGET < MID
//     Num must be on left side
//     IF LEFT < RIGHT --> IF LEFT > TARGET || TARGET > MID
//     Num must be on right side
//Use same logic for LEFT > RIGHT case
var search = function (nums, target) {
    if (nums == null || nums.length == 0) {
        return -1;
    }

    let left = 0
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (target == nums[mid]) {
            return mid;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            }
            else {
                left = mid + 1;
            }
        }
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
    }
    return -1;
};


//#15. 3Sum
// Sort array, for each value less than 0 and not a duplicate,
// Loop through right half, if sum is greater decrement right, if sum
// is less than move j left. Solution built off idea that to get 0, one number
// must be negative (or all 0). Solution avoids duplicates by iteration while loops.
//Time Complexit: O(N^2)
var threeSum = function (nums) {
    var rtn = [];
    if (nums.length < 3) {
        return rtn;
    }
    nums = nums.sort(function (a, b) {
        return a - b;
    });
    for (var i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) {
            return rtn;
        }
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue;
        }
        for (var j = i + 1, k = nums.length - 1; j < k;) {
            if (nums[i] + nums[j] + nums[k] === 0) {
                rtn.push([nums[i], nums[j], nums[k]]);
                j++;
                k--;
                while (j < k && nums[j] == nums[j - 1]) {
                    j++;
                }
                while (j < k && nums[k] == nums[k + 1]) {
                    k--;
                }
            } else if (nums[i] + nums[j] + nums[k] > 0) {
                k--;
            } else {
                j++;
            }
        }
    }
    return rtn;
};