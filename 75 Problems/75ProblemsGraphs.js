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

//417 Pacific Atlantic Water Flow
//Summary: Iterate through outer edges, then DFS from there to find
//values that will flow down, compare two arrays for pacific and atlantic
//true/false values
//Time Complexity: O(M*N)
var pacificAtlantic = function (matrix) {
    var res = [];

    if (!matrix || matrix.length === 0 || matrix[0].length === 0) { return res; }

    var ymax = matrix.length - 1;
    var xmax = matrix[0].length - 1;
    var pacific = [];
    var atlantic = [];
    for (let y = 0; y <= ymax; y++) { //sets up array of falses
        var rowPacific = [];
        var rowAtlantic = [];
        for (let x = 0; x <= xmax; x++) {
            rowPacific.push(false);
            rowAtlantic.push(false);
        }
        pacific.push(rowPacific);
        atlantic.push(rowAtlantic);
    }

    for (let y = 0; y <= ymax; y++) {
        helper(0, y, pacific, -1, matrix);
        helper(xmax, y, atlantic, -1, matrix);
    }

    for (let x = 0; x <= xmax; x++) {
        helper(x, 0, pacific, -1, matrix);
        helper(x, ymax, atlantic, -1, matrix);
    }

    for (let y = 0; y <= ymax; y++) {
        for (let x = 0; x <= xmax; x++) {
            if (pacific[y][x] && atlantic[y][x]) {
                res.push([y, x]);
            }
        }
    }
    return res;
};

var helper = function (x, y, visited, height, matrix) {
    if (x < 0 || x >= matrix[0].length || y < 0 || y >= matrix.length || visited[y][x] || matrix[y][x] < height) {
        return;
    }

    visited[y][x] = true;
    helper(x + 1, y, visited, matrix[y][x], matrix);
    helper(x - 1, y, visited, matrix[y][x], matrix);
    helper(x, y + 1, visited, matrix[y][x], matrix);
    helper(x, y - 1, visited, matrix[y][x], matrix);
};