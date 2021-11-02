//104 Maximum Depth of Binary Tree
//Summary: Use eith BFS or DFS

//DFS
var maxDepth = function (root) {
    const findMaxDepth = (node, depth) => {
        if (!node) {
            return depth;
        }
        return Math.max(findMaxDepth(node.left, depth + 1), findMaxDepth(node.right, depth + 1));
    }

    return findMaxDepth(root, 0);

}
//BFS
var maxDepth = function (root) {
    var queue = []
    queue.push(root);
    let size;
    let cur;
    let count = 0;
    if (root) {
        while (queue.length > 0) {
            size = queue.length;
            for (let i = 0; i < size; i++) {
                cur = queue.shift();
                if (cur.left) {
                    queue.push(cur.left)
                }
                if (cur.right) {
                    queue.push(cur.right)
                }
            }
            count++
        }
    }
    return count;
}



//100 Same Tree
//Summary: Used BFS for two queues


var isSameTree = function (p, q) {
    let pQueue = []
    let qQueue = []
    qQueue.push(q);
    pQueue.push(p);
    if (p && q && p.val !== q.val) {
        return false
    }
    if ((p === null || q === null) && p !== q) {
        return false
    }
    let psize;
    let qsize;
    if (p && q) {
        while (pQueue.length > 0 && qQueue.length > 0) {
            psize = pQueue.length;
            qsize = qQueue.length;
            if (psize !== qsize) {
                return false;
            }
            for (let i = 0; i < psize; i++) {
                let p = pQueue.shift();
                let q = qQueue.shift();
                if (p.left && q.left && p.left.val !== q.left.val) {
                    return false;
                }
                if (p.right && q.right && p.right.val !== q.right.val) {
                    return false;
                }
                if ((p.left && !q.left) || (p.right && !q.right) || (!p.left && q.left) || (!p.right && q.right)) {
                    return false
                }
                if (p.val !== q.val) {
                    return false;
                } else {
                    if (p.left) {
                        pQueue.push(p.left)
                    }
                    if (p.right) {
                        pQueue.push(p.right)
                    }
                    if (q.left) {
                        qQueue.push(q.left)
                    }
                    if (q.right) {
                        qQueue.push(q.right)
                    }
                }
            }
        }
    }
    return true;
};


//226 Invert Binary Tree
//Summary: DFS approach, at each node switch the left and right values
//Time Complexity: O(logN)
var invertTree = function (root) {
    if (!root) {
        return null
    }
    let temp = root.right;
    root.right = root.left;
    root.left = temp;
    invertTree(root.left);
    invertTree(root.right);
    return root
};


//572 Subtree of Another Tree
//Summary: Use DFS to analyze each node
//Time Complexity: O(N)
var isSubtree = function (s, t) {
    if (!s) return false;
    return isEqual(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};

function isEqual(root1, root2) {
    if (!root1 || !root2) return !root1 && !root2; //ensure that nodes end at same level
    if (root1.val !== root2.val) return false;
    return isEqual(root1.left, root2.left) && isEqual(root1.right, root2.right);
}

//102 Binary Tree Level Order Traversal
//Summary: Use BFS to track the levels
//Time Complexity: O(N)
var levelOrder = function (root) {
    let queue = []
    let output = []
    queue.push(root);
    let size
    let cur
    let currLevel
    if (root) {
        while (queue.length > 0) {
            size = queue.length
            currLevel = [];
            for (let i = 0; i < size; i++) {
                cur = queue.shift();
                if (cur.left) {
                    queue.push(cur.left);
                }
                if (cur.right) {
                    queue.push(cur.right)
                }
                currLevel.push(cur.val)
            }
            output.push(currLevel)
        }

    }
    return output
};

//105 Construct Binary Tree from Preorder and Inorder Traversal
//Summary: Difficult problem, preorder is in order, but see if inorder is correct
//Time Complexity: O(N)

function buildTree(preorder, inorder) {
    return build(0, inorder.length - 1);

    function build(l, r) {
        if (l > r) {
            return null;
        }
        var v = preorder.shift();
        var i = inorder.indexOf(v);
        var root = new TreeNode(v);
        root.left = build(l, i - 1);
        root.right = build(i + 1, r); //1, 0
        return root;
    }
}


//98 Validate Binary Search Tree
//Summary: DFS and compare using a helper method
//Time Complexity: O(N)

var isValidBST = function (root) {
    if (!root) {
        return false
    }
    function helper(root, min, max) {
        if (!root) {
            return true;
        }
        if ((max !== null && root.val >= max) || (min !== null && root.val <= min)) {
            return false
        }
        return helper(root.left, min, root.val) && helper(root.right, root.val, max)
    }
    return helper(root, null, null);
};

//Kth Smallest Element in a BST
//Summary: Elegant Iterative Inorder Traversal
//Time Complexiy: O(H+k) where H is the height

var kthSmallest = function (root, k) {
    if (!root) return null;
    const stack = [];
    let node = root;

    while (stack.length || node) {
        while (node) {
            stack.push(node);
            node = node.left;
        }

        node = stack.pop();
        k--
        if (k === 0) {
            return node.val;
        }
        node = node.right;
    }

    return null;
};
//OR Recursive inoder traversal O(N)
//More intuitive, less efficent though as we must go through whole tree
var kthSmallest = function (root, k) {
    arr = []
    function helper(root) {
        if (!root) {
            return null
        }
        helper(root.left);
        arr.push(root.val)
        helper(root.right);
    }
    helper(root)
    return arr[k - 1]
};