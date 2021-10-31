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