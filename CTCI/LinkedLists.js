//2.1 Remove Dups
//83 Remove Duplicates from Sorted List
//Summary: Next.next becomes next if duplicate
//Time Complexity: O(N)
var deleteDuplicates = function (head) {
    if (!head) return head
    var cur = head

    while (cur != null && cur.next != null) {
        if (cur.next.val === cur.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
};


//2.3 Delete Middle Node
//#237 Delete Ndoe in a Linked List
//Summary: Cant delete node, but change value and next value
//Time Comlexity: O(1)

var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};


//2.6 Palindrome
//#234 Palindrome Linked List
//Summary: Reverse second half of list, then compare lists

var isPalindrome = function (head) {
    if (head === null) {
        return null;
    }
    if (head.next === null) {
        return null
    }
    let fast = head;
    let slow = head;

    while (fast.next !== null && fast.next.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    slow.next = reverseList(slow.next);
    slow = slow.next
    while (slow !== null) {
        if (slow.val !== head.val) {
            return false
        }
        slow = slow.next;
        head = head.next;
    }
    return true;
};

var reverseList = function (head) {
    let next = null;
    let prev = null;
    while (head !== null) {
        next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

//OR a simple way, just compare strings
var isPalindrome = function (head) {

    let normal = ""
    let reversed = ""
    while (head != null) {
        normal += head.val
        reversed = head.val + reversed
        head = head.next
    }
    return (reversed === normal)
}


//2.7 Intersection
//Summary: If end of list, continuously append other linked list to the end
//Time Complexity: O(N)
var getIntersectionNode = function (headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let r1 = headA;
    let r2 = headB;
    while (r1 !== r2) {
        r1 = r1.next;
        r2 = r2.next;
        if (r1 === r2) {
            return r1;
        }
        if (r1 === null) {
            r1 = headB;
        }
        if (r2 === null) {
            r2 = headA;
        }
    }
    return r1;
};

//2.8 Loop Detection
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