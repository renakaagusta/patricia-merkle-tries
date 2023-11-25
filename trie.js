const TrieNode = require('./node');

class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    insert(letters) {
        let [startingNode, slicedLetters] = this.getStartingNode(this.root, letters)
        this.lastInsertedNode = startingNode;

        slicedLetters.split("").map((letter) => {
            let newNode = new TrieNode(letter)
            newNode.isWord = true
            this.lastInsertedNode.children[letter] = newNode
            this.lastInsertedNode.isWord = false
            this.lastInsertedNode = newNode;
        })
    }

    getStartingNode(node, letters) {
        if (Object.keys(node.children).length === 0) {
            return [node, letters];
        }

        if (node.children[letters.split("")[0]]) {
            return this.getStartingNode(node.children[letters.split("")[0]], letters.split("").slice(1, letters.length).join(""))
        } else {
            return [node, letters]
        }
    }

    contains(letters) {
        let isContains = true

        let node = this.root
        letters.split("").map((letter) => {
            if (node.children[letter]) {
                node = node.children[letter]
            } else {
                isContains = false
            }
        })

        return isContains ? node.isWord == true : false
    }
}

module.exports = Trie;