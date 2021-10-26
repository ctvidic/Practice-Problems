//#206 Reverse Linked List
//Summary: Can be done either recursively or iteratively
//O(N)

//Iteratively
function reverseList(head) {
    let next = null;
    let prev = null;
    while (head) {
        next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
}

//Recursively
function reverseList(head) {
    if (!head || !head.next) {
        return head;
    }
    let next = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return next
}



//#141 Linked List Cycle
//Summary: Have one going faster than slow, eventually, if there is a cycle they will 
//be equal
//Time Complexity: O(N)

var hasCycle = function (head) {
    let slowHead = head;
    let fastHead = head;
    while (fastHead && fastHead.next) {
        slowHead = slowHead.next;
        fastHead = fastHead.next.next;
        if (slowHead === fastHead) {
            return true;
        }
    }
    return false;

};


//#21 Merge Two Sorted Lists
//Summary: Recursive calls until one list is null, compare values at each step
//Time Complexity(O(N))

var mergeTwoLists = function (l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};

//#19 Remove Nth Node From End of List
//Summary: A fast runner that will help identify where the slow runner should stop
//Time Complexity: O(N)

var removeNthFromEnd = function (head, n) {
    let first = head;
    let slow = head;
    let fast = head;

    for (let i = 0; i < n; i++) {
        fast = fast.next;
    };

    if (!fast) {
        return slow.next;
    };
    while (fast && fast.next) {
        fast = fast.next;
        slow = slow.next;
    };
    slow.next = slow.next.next;
    return first;
};