//128 Longest Consecutive Sequence
//Summary: Convert array to set so it is unique, then iterate throught character
//Check n-1 so that you will always begin consecutive iteration at lowest value
//Time Complexity: O(N)

var longestConsecutive = function (nums) {
    const numSet = new Set(nums);
    let maxLen = 0;
    for (let n of numSet) {
        if (numSet.has(n - 1)) continue;
        let len = 1;
        while (numSet.has(n + len)) len++;
        console.log(len)
        maxLen = Math.max(maxLen, len);
    }
    return maxLen;
};