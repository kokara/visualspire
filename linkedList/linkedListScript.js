let id = 0;
class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
        this.nodeID = generateNodeID();
    }
}

let generateNodeID = () => ++id;