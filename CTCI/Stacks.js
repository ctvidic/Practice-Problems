//3.2
//155 Min Stack
//Summary: Find minimum value in constant time, so constantly calculate min with
//each push of the stack
//Time Complexity: O(N)

var MinStack = function () {
    this.stack = []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    let min;
    if (this.stack.length === 0) {
        min = val
    } else {
        if (min === null) {
            min = val
        } else {
            min = Math.min(this.stack[this.stack.length - 1].min, val);
        }
    }
    this.stack.push({ val: val, min: min });
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    if (this.stack.length > 0) {
        this.stack.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    if (this.stack.length > 0) {
        return this.stack[this.stack.length - 1].val
    }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    if (this.stack.length > 0) {
        return this.stack[this.stack.length - 1].min
    }
};