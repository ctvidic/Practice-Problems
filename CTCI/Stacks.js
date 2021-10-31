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


//232 Implement Queue Using Stacks
//Use two stacks to keep track of queue
//Time Complexity: (O(1)) Amortized

var MyQueue = function () {
    this.front = [];
    this.back = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.back.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    if (!this.front.length) {
        while (this.back.length) { // move back to front
            this.front.push(this.back.pop());
        }
    }
    return this.front.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    if (!this.front.length) {
        while (this.back.length) { // move back to front
            this.front.push(this.back.pop());
        }
    }
    return this.front[this.front.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return !this.front.length && !this.back.length;
};

//1172 Dinner Plate Stacks
//Summary: Annoying got TLE, but solution should work
var DinnerPlates = function (capacity) {
    this.stacks = [[]]
    this.current = 0;
    this.capacity = capacity
    this.totalLength = 1
};

/** 
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function (val) {
    if (this.current > this.stacks.length) {
        this.current = this.stacks.length - 1
    }
    if (this.stacks[this.current].length === this.capacity) {
        while (this.stacks[this.current] !== undefined && this.stacks[this.current].length === this.capacity) {
            this.current += 1;
        }
        if (this.stacks[this.current] === undefined) {
            this.stacks.push([]);
            this.totalLength += 1;
        }

        this.stacks[this.current].push(val)
    } else {
        this.stacks[this.current].push(val)
    }
};

/**
 * @return {number}
 */
DinnerPlates.prototype.pop = function () {
    this.current = this.stacks.length - 1;
    while (this.current >= 0 && this.stacks[this.current].length === 0) {
        this.current--;
    }
    if (this.current < 0) {
        this.current = 0
        return -1
    }
    if (this.stacks[this.current].length > 0) {
        return this.stacks[this.current].pop();
    }
};

/** 
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function (index) {
    console.log(index)
    this.current = index;
    if (this.stacks[index] !== undefined && this.stacks[index].length > 0) {
        return this.stacks[index].pop();
    } else if (index > this.stacks.length - 1) {
        return -1
    } else if (this.stacks[index].length === 0) {
        return -1
    }

};