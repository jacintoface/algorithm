
class BST {

    root = null

    count = 0

    constructor (key, value) {
        this[key] = value
        this.left = null
        this.right = null
    }

    size () {
        return this.count;
    }

    isEmpty () {
        return this.count === 0;
    }

    contain (key) {
        return __this.contain(this.root, key)
    }

    __contain (node, key) {

        if (!node) {
            return false
        }

        if (key == node.key) {
            return true
        } else if (key < node.key) {
            return this.__contain(node.left, key)
        } else {
            return this.__contain(node.right, key)
        }
    }

    insert (key, value) {
        this.root = this.__insert(this.root, key, value)
    }

    __insert (node, key, value) {

        if (node === null) {
            this.count++
            return new Node(key, value)
        }

        if (key == node.key) {
            node.value = value
        } else if (key < node.key) {
            node.left = this.__insert(node.left, key, value)
        } else {
            node.right = this.__insert(node.right, key, value)
        }

        return node
    }

    search (key) {
        return this.__search(this.root, key)
    }

    __search (node, key) {
        if (node == null) {
            return null
        }

        if (node.key == key) {
            return node.value
        } else if (node.key < key) {
            return this.__search(node.left, key)
        } else {
            return this.__search(node.right, key)
        }
    }
}

class Node {
    constructor (key, value) {
        this.key = key
        this.value = value
        this.left = null
        this.right = null
    }
}
