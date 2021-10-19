//#70 Climbing Stairs
//Summary: Basically fibonnaci, utilize memoization to reduce time complexity
//Time Complexity: Should be O(n)
const fib = { 1: 1, 2: 2 };

var climbStairs = function (n) {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    if (fib.hasOwnProperty(n)) {
        return fib[n]
    } else {
        fib[n] = climbStairs(n - 1) + climbStairs(n - 2);
        return fib[n];
    }
};