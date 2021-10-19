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