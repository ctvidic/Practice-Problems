//#371: Sum of Two Integers
//Summary: First, create carry that is and operator of two binary numbers, 
//shift this left, this becomes the carry. Then use XOR operator for value to be added,
//if carry is needed while loop will continue until b(carry) is 0.

var getSum = function (a, b) {
    let carry;
    while ((b) !== 0) {
        carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a ^ b;
};


//#191 Number of 1 Bits
//Summary: Compare n to ...0001, if both have value at 1 then sum will increment.
//N continues right shifting until 0.

var hammingWeight = function (n) {
    let sum = 0;
    while (n !== 0) {
        sum += (n & 1);
        n = n >>> 1
    }
    return sum;
};


//#338 Counting Bits
//Summary: Solution built off fact that even number i count is same as half of even
//number i count. Odd number i count is same as half plus 1.

var countBits = function (n) {
    let result = []
    for (let i = 0; i <= n; i++) {
        if (i === 0) {
            result.push(0)
            continue
        }
        if (i === 1 || i === 2) {
            result.push(1)
            continue
        }
        if (i % 2 === 0) {
            result.push(result[Math.floor(i / 2)])
        } else {
            result.push(result[Math.floor(i / 2)] + 1)
        }
    }
    return result
};


//#268 Missing Number
//Summary: Create mock array filled with -1. Loop through input array, at input array
//value replace number, only one -1 should be remaining which will be the necessary value.
//O(N) = N

var missingNumber = function (nums) {

    let arr = new Array(nums.length + 1);
    arr.fill(-1);

    for (let i = 0; i < nums.length; i++) {
        arr[nums[i]] = nums[i];
    }
    return arr.indexOf(-1)
};