//56 Merge Intervals
//Summary: Merge intervals if max is greater than min, mutate original array
//Time Complexity: O(nlogn)
var merge = function (intervals) {
    if (intervals.length < 2) return intervals;
    intervals.sort((a, b) => a[0] - b[0]) //Arr have smaller element come first
    let i = 1;
    while (i < intervals.length) {
        curr = intervals[i];
        prev = intervals[i - 1];
        if (curr[0] <= prev[1]) {
            intervals[i] = [Math.min(prev[0], curr[0]), Math.max(prev[1], curr[1])]
            intervals.splice(i - 1, 1);
            i--
        }
        i++
    }
    return intervals
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