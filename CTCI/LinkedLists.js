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

//OR a simple way
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
